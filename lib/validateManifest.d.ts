import { ValidateFunction } from "ajv/dist/2020.js";
/** A single validation error, mirroring the shape of an Ajv `ErrorObject`. */
export interface ManifestValidationError {
    keyword: string;
    instancePath: string;
    schemaPath: string;
    params: Record<string, unknown>;
    propertyName?: string;
    message?: string;
}
/** The outcome of validating a manifest against a schema. */
export interface ManifestValidationResult {
    valid: boolean;
    errors: ManifestValidationError[];
}
/** Resolves an external schema referenced via `$ref` by its URI. */
export type SchemaLoader = (uri: string) => Promise<object>;
export interface CreateManifestValidatorOptions {
    /**
     * Resolver for external (`$ref`) schemas. Defaults to a `fetch`-based loader.
     * Meta-schemas (json-schema.org draft-06/07) are served locally and never passed here.
     */
    loadSchema?: SchemaLoader;
}
export interface ValidateManifestOptions extends CreateManifestValidatorOptions {
    /**
     * The manifest schema to validate against. Defaults to the `schema.json` shipped with
     * this package. Pass an explicit schema to validate against a specific manifest version
     * or the components-in-libraries schema (`@ui5/manifest/schema_cil.json`).
     */
    schema?: object;
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
export declare function createManifestValidator(schema?: object, options?: CreateManifestValidatorOptions): Promise<ValidateFunction>;
/**
 * Like {@link createManifestValidator}, but `schema` defaults to the `schema_cil.json`
 * shipped with this package — the schema for components that live inside libraries.
 *
 * @param schema The manifest schema. Defaults to the bundled `schema_cil.json`.
 * @param options Optional external-schema loader.
 * @throws If the schema cannot be compiled or uses an unsupported meta-schema.
 */
export declare function createComponentManifestValidator(schema?: object, options?: CreateManifestValidatorOptions): Promise<ValidateFunction>;
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
export declare function validateManifest(manifest: object, options?: ValidateManifestOptions): Promise<ManifestValidationResult>;
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
export declare function validateComponentManifest(manifest: object, options?: ValidateManifestOptions): Promise<ManifestValidationResult>;
