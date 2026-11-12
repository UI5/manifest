import { createRequire } from "module";
import Ajv2020 from "ajv/dist/2020.js";
import Ajv from "ajv";
import addFormats from "ajv-formats";
const require = createRequire(import.meta.url);
const draft06MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json");
const draft07MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const DRAFT_2020 = "https://json-schema.org/draft/2020-12/schema";
const DRAFT_07 = "http://json-schema.org/draft-07/schema#";
const DRAFT_06 = "http://json-schema.org/draft-06/schema#";
// The schema shipped alongside this module (package root: ../schema.json relative to the
// compiled lib/validateManifest.js). Loaded lazily and only when the caller does not pass
// an explicit schema.
let bundledSchema;
function getBundledSchema() {
    if (!bundledSchema) {
        bundledSchema = require("../schema.json");
    }
    return bundledSchema;
}
// The components-in-libraries schema shipped alongside this module (../schema_cil.json).
// Loaded lazily and only when the caller does not pass an explicit schema.
let bundledCilSchema;
function getBundledCilSchema() {
    if (!bundledCilSchema) {
        bundledCilSchema = require("../schema_cil.json");
    }
    return bundledCilSchema;
}
// Module-level cache of in-flight/resolved external schema loads, shared across all
// validators and keyed by URI. Storing the promise de-duplicates concurrent loads of the
// same URI (mirroring the original mutex); failures are evicted so a later call can retry.
const externalSchemaCache = new Map();
function isJsonSchemaDraft(uri, draft) {
    return /^https?:\/\/json-schema\.org\/draft/.test(uri) && uri.includes(`/${draft}/schema`);
}
/**
 * Default external-schema loader. Uses the global `fetch` (Node 18+) so the published
 * package pulls in no additional network dependency.
 */
async function defaultLoadSchema(uri) {
    const response = await fetch(uri);
    if (!response.ok) {
        throw new Error(`Failed to fetch schema ${uri}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
}
/**
 * Wraps the caller-provided loader with the behaviour Ajv's `loadSchema` needs:
 * short-circuit the draft meta-schemas, patch the Adaptive Card schema's `id` to `$id`,
 * and cache successful loads across validators.
 */
function createAjvLoadSchema(userLoadSchema) {
    return async (uri) => {
        if (isJsonSchemaDraft(uri, "draft-06")) {
            return draft06MetaSchema;
        }
        if (isJsonSchemaDraft(uri, "draft-07")) {
            return draft07MetaSchema;
        }
        let pending = externalSchemaCache.get(uri);
        if (!pending) {
            pending = (async () => {
                const schema = await userLoadSchema(uri);
                // Adaptive Card schema uses the Draft-06 "id" keyword; Ajv expects "$id".
                // See https://github.com/microsoft/AdaptiveCards/issues/9274
                if (uri.includes("adaptive-card.json") && typeof schema.id === "string") {
                    schema.$id = schema.id;
                    delete schema.id;
                }
                return schema;
            })();
            externalSchemaCache.set(uri, pending);
            // Evict failed loads so the next attempt can retry (the original only populated
            // its cache after a successful fetch).
            pending.catch(() => externalSchemaCache.delete(uri));
        }
        return pending;
    };
}
/**
 * JSON Schema 2020-12 requires "items" to be an object/boolean, not an array; arrays
 * must use "prefixItems". Some UI5 manifest schemas (e.g. v1.68.0) still use the array
 * form inside `$defs[*].oneOf[*]`. Rewrite those in place before compiling.
 * See https://github.com/UI5/manifest/issues/34
 */
function applyItemsWorkaround(schema) {
    const defs = schema?.$defs;
    if (!defs) {
        return;
    }
    for (const defKey in defs) {
        const oneOf = defs[defKey]?.oneOf;
        if (!oneOf) {
            continue;
        }
        for (const option of oneOf) {
            if (Array.isArray(option?.items)) {
                option.prefixItems = option.items;
                delete option.items;
            }
        }
    }
}
async function createValidateFunction2020(schema, loadSchema) {
    try {
        const ajv = new Ajv2020({
            allErrors: true,
            strict: false,
            unicodeRegExp: false,
            loadSchema: createAjvLoadSchema(loadSchema),
        });
        addFormats(ajv);
        // Register meta-schemas so external schemas can be validated against their own
        // $schema declaration without recursing back into loadSchema.
        ajv.addMetaSchema(draft06MetaSchema, DRAFT_06);
        ajv.addMetaSchema(draft07MetaSchema, DRAFT_07);
        applyItemsWorkaround(schema);
        return await ajv.compileAsync(schema);
    }
    catch (error) {
        throw new Error(`Failed to create UI5 manifest validate function: ` +
            `${error instanceof Error ? error.message : String(error)}`);
    }
}
async function createValidateFunctionDraft07(schema, loadSchema) {
    try {
        const ajv = new Ajv({
            allErrors: true,
            strict: false,
            unicodeRegExp: false,
            loadSchema: createAjvLoadSchema(loadSchema),
        });
        addFormats(ajv);
        ajv.addMetaSchema(draft06MetaSchema, DRAFT_06);
        return await ajv.compileAsync(schema);
    }
    catch (error) {
        throw new Error(`Failed to create UI5 manifest validate function: ` +
            `${error instanceof Error ? error.message : String(error)}`);
    }
}
/**
 * Compile a reusable validate function for a UI5 manifest schema. Prefer this over
 * {@link validateManifest} when validating many manifests against the same schema, as
 * the schema is compiled only once.
 *
 * The validator is selected from the schema's `$schema` property: `2020-12` uses the
 * 2020-12 validator, `draft-07` uses the Draft-07 validator. Any other value — including
 * a missing `$schema` — is rejected.
 *
 * @param schema The manifest schema. Defaults to the `schema.json` shipped with this package.
 * @param options Optional external-schema loader.
 * @throws If the schema cannot be compiled or uses an unsupported meta-schema.
 */
export async function createManifestValidator(schema = getBundledSchema(), options = {}) {
    const loadSchema = options.loadSchema ?? defaultLoadSchema;
    const metaSchema = schema?.$schema;
    if (metaSchema === DRAFT_2020) {
        return createValidateFunction2020(schema, loadSchema);
    }
    else if (metaSchema === DRAFT_07) {
        return createValidateFunctionDraft07(schema, loadSchema);
    }
    else {
        throw new Error(`Failed to create UI5 manifest validate function:` +
            ` ${metaSchema ?? "undefined"} is not a supported meta-schema. ` +
            `Supported meta-schemas: "${DRAFT_2020}", "${DRAFT_07}"`);
    }
}
/**
 * Like {@link createManifestValidator}, but `schema` defaults to the `schema_cil.json`
 * shipped with this package — the schema for components that live inside libraries.
 *
 * @param schema The manifest schema. Defaults to the bundled `schema_cil.json`.
 * @param options Optional external-schema loader.
 * @throws If the schema cannot be compiled or uses an unsupported meta-schema.
 */
export async function createComponentManifestValidator(schema = getBundledCilSchema(), options = {}) {
    return createManifestValidator(schema, options);
}
function toValidationError(error) {
    return {
        keyword: error.keyword ?? "",
        instancePath: error.instancePath ?? "",
        schemaPath: error.schemaPath ?? "",
        params: error.params ?? {},
        propertyName: error.propertyName,
        message: error.message,
    };
}
// Cache of compiled validators keyed by the schema object, so repeated validations of the
// same schema (e.g. many manifests of one version) compile it only once. Keyed by object
// identity via a WeakMap, so it never keeps a schema alive or leaks across callers.
const validatorCache = new WeakMap();
function getCachedValidator(schema, loadSchema) {
    // WeakMap keys must be objects; let createManifestValidator reject non-objects itself.
    if (typeof schema !== "object" || schema === null) {
        return createManifestValidator(schema, { loadSchema });
    }
    let pending = validatorCache.get(schema);
    if (!pending) {
        pending = createManifestValidator(schema, { loadSchema });
        validatorCache.set(schema, pending);
        // Don't cache a failed compile, so a later call can retry.
        pending.catch(() => validatorCache.delete(schema));
    }
    return pending;
}
/**
 * Validate a UI5 manifest against a schema.
 *
 * @example
 * import { validateManifest } from "@ui5/manifest";
 * // Validates against the schema shipped with this package:
 * const { valid, errors } = await validateManifest(manifest);
 *
 * @param manifest The manifest object to validate.
 * @param options Optional settings. `options.schema` defaults to the `schema.json` shipped
 *   with this package; `options.loadSchema` resolves external (`$ref`) schemas.
 * @returns Whether the manifest is valid and, if not, the list of validation errors.
 * @throws If the schema cannot be compiled or uses an unsupported meta-schema.
 */
export async function validateManifest(manifest, options = {}) {
    return runValidation(manifest, options.schema ?? getBundledSchema(), options.loadSchema);
}
/**
 * Validate a UI5 component manifest (a component that lives inside a library) against the
 * components-in-libraries schema.
 *
 * @example
 * import { validateComponentManifest } from "@ui5/manifest";
 * // Validates against the schema_cil.json shipped with this package:
 * const { valid, errors } = await validateComponentManifest(manifest);
 *
 * @param manifest The component manifest object to validate.
 * @param options Optional settings. `options.schema` defaults to the `schema_cil.json`
 *   shipped with this package; `options.loadSchema` resolves external (`$ref`) schemas.
 * @returns Whether the manifest is valid and, if not, the list of validation errors.
 * @throws If the schema cannot be compiled or uses an unsupported meta-schema.
 */
export async function validateComponentManifest(manifest, options = {}) {
    return runValidation(manifest, options.schema ?? getBundledCilSchema(), options.loadSchema);
}
async function runValidation(manifest, schema, loadSchema) {
    const validate = await getCachedValidator(schema, loadSchema);
    const valid = validate(manifest);
    if (valid) {
        return { valid: true, errors: [] };
    }
    return {
        valid: false,
        errors: (validate.errors ?? []).map((error) => toValidationError(error)),
    };
}
