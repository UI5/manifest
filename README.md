# @ui5/manifest

[![REUSE status](https://api.reuse.software/badge/github.com/UI5/manifest)](https://api.reuse.software/info/github.com/UI5/manifest)
[![npm version](https://badge.fury.io/js/@ui5%2Fmanifest.svg)](https://badge.fury.io/js/@ui5%2Fmanifest)

## Description
This project contains a JSON schema for the UI5 manifest.

This JSON schema for the UI5 manifest is meant to be referenced in the [JSON Schema Store](https://www.schemastore.org/json/). This provides validation and code completion of the `manifest.json` file in SAP Business Application Studio or other IDEs.

TypeScript type definitions are available for schema code completion, documentation, and type checking within IDEs.

## Validation API

The package exports a runtime validation API so you can validate a manifest against a UI5 manifest schema programmatically. By default it validates against the `schema.json` shipped with this package — you don't need to load a schema yourself:

```ts
import { validateManifest } from "@ui5/manifest";

const manifest = { _version: "1.60.0", "sap.app": { id: "my.app", type: "application" } };

const { valid, errors } = await validateManifest(manifest);
if (!valid) {
  console.error(errors);
}
```

To validate against a different schema — for example a version-specific schema you fetched for a particular manifest version — pass it explicitly:

```ts
import { validateManifest } from "@ui5/manifest";

const { valid, errors } = await validateManifest(manifest, { schema: fetchedSchema });
```

For a component that lives inside a library, use `validateComponentManifest`, which defaults to the components-in-libraries schema (`schema_cil.json`):

```ts
import { validateComponentManifest } from "@ui5/manifest";

const { valid, errors } = await validateComponentManifest(componentManifest);
```

### `validateManifest(manifest, options?)`

Validates a single manifest and resolves to a result object.

- `manifest` – the manifest object to validate.
- `options.schema` *(optional)* – the manifest schema to validate against (a parsed JSON object). **Defaults to the `schema.json` shipped with this package.** Its meta-schema is read from the schema's `$schema` property; `https://json-schema.org/draft/2020-12/schema` and `http://json-schema.org/draft-07/schema#` are supported.
- `options.loadSchema` *(optional)* – `(uri: string) => Promise<object>` used to resolve external schemas referenced via `$ref` (for example the Adaptive Card schema). Defaults to a `fetch`-based loader. Meta-schemas are served locally and are never passed to this function.

Returns `Promise<{ valid: boolean; errors: ValidationError[] }>`, where each error mirrors an [Ajv](https://ajv.js.org/) error (`keyword`, `instancePath`, `schemaPath`, `params`, `propertyName?`, `message?`).

### `validateComponentManifest(manifest, options?)`

Same as `validateManifest`, but `options.schema` **defaults to the `schema_cil.json` shipped with this package** — the schema for components that live inside libraries. Pass `options.schema` to override. Same return shape and `loadSchema` option.

### `createManifestValidator(schema?, options?)`

When validating many manifests against the **same** schema, compile the validator once and reuse it (`schema` defaults to the bundled `schema.json`):

```ts
import { createManifestValidator } from "@ui5/manifest";

const validate = await createManifestValidator();
for (const manifest of manifests) {
  const valid = validate(manifest); // validate.errors is populated on failure
}
```

`createManifestValidator` returns the compiled Ajv validate function (with `.errors` populated on failure). `validateManifest` is a convenience wrapper around it for one-off validations.

### `createComponentManifestValidator(schema?, options?)`

Same as `createManifestValidator`, but `schema` **defaults to the bundled `schema_cil.json`** (components inside libraries). Use it to compile a reusable validator for component manifests.

> Validation enforces string [formats](https://ajv.js.org/guide/formats.html) (e.g. `uri`), so a property declared with `"format": "uri"` must be an absolute URI.

## How to Obtain Support
In case you need any support, please create a [GitHub issue](https://github.com/UI5/manifest/issues).

## Release History
See [CHANGELOG.md](CHANGELOG.md).

## Contributing
We currently don't accept external contributions for this project. 
This project is only updated by SAP employees. We only accept bug reports; check the support section above.
