# Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<a name="Unreleased"></a>
## [Unreleased]

<a name="v2.1.1"></a>
## [v2.1.1] - 2025-12-08  (UI5 1.140)

### Added
- sap.card: Added new property "useMainDestinations"

<a name="v2.1.0"></a>
## [v2.1.0] - 2025-09-12  (UI5 1.139)

### Added
- sap.card: Added new property "header/subtitle"
- sap.card: Added new property "overflow/subtitle" in an object content item of type "Image"
- sap.card: Added option for "actions" for all elements of type "status"

### Changed
- sap.card: Deprecated property "header/subTitle" (with capital T)
- sap.card: Deprecated property "overflow/subTitle" (with capital T) in an object content item of type "Image"

<a name="v1.77.0"></a>
## [v1.77.0] - 2025-08-04  (UI5 1.139)

### Added
- sap.flp: new property "vizOptions" has been added to provide more options for tile sizes. Only needed for declaration of custom Fiori launchpad tiles.

### Removed
- sap.ui5/resource:
	- `js` property: removed
- sap.ui5/rootView:
	- `async` property: removed
	- `type` property: Removed "HTML", "JS", "Template", "JSON" from possible values
- sap.ui5/routing:
	- config: async property removed
	- targets: Removed legacy options, e.g., viewName, viewId, viewPath
- sap.ovp: Removed Deprecated property globalFilterEntityType, globalFilterEntitySet should be used instead.
- sap.ovp/cards: Removed deprecated property sequencePos.
- sap.ovp/cards/settings: Corrected location for "tabs" property configuration.
- sap.card: Remove all properties which are marked as deprecated. Some of the properties will continue to work in the runtime, but should not be used anymore.
- sap.card: Remove option for "service" in "data" and "actions" section which was never published
- sap.flp/origin: has been removed, as it is not used anymore
- sap.flp/tileSize: has been removed in favor of sap.flp/vizOptions/displayFormats
- sap.flp/type: is optional, defaults to "application"

<a name="v2.0.0"></a>
## [v2.0.0] - 2025-04-30  (UI5 1.136)
- sap.ui5/resources: Deprecated "js" property. Only "css" is a valid resource.
- sap.ui5/routing/targets: Deprecated options that are prefixed with "view", e.g., "viewName". Use options without "view"-prefix instead.

### Added
- sap.card/header: Added new section "infoSection".
- sap.card/configuration: Added new property "placeholder" for DateRange filter.

<a name="v1.72.3"></a>
## [v1.72.3] - 2025-03-21  (UI5 1.135)

### Added
- sap.ui5/commands: added new "ref" property to reference SAP standardized command and a "description" property to provide a translatable text for describing the command.

<a name="v1.71.0"></a>
## [v1.71.0] - 2025-03-06  (UI5 1.134)

### Added
- sap.card: new property "configuration/loadingPlaceholders/delay". Allows to control the delay of the loading placeholders for the whole card.

<a name="v1.70.1"></a>
## [v1.70.1] - 2025-02-12 (UI5 1.133)

### Changed
- sap.ui5: add support for legacy (e.g. viewPath) and new options (e.g. path) in routing config when flex enabled.

<a name="v1.70.0"></a>
## [v1.70.0] - 2025-02-10 (UI5 1.133)

### Added
- sap.card: new property "closeButton" for footer. Allows to control the visibility of the close button which appears in the card footer. Replaces the property "closeButton" from the header section.

### Changed
- sap.card: deprecated property "closeButton" for header. Replaced by the property "closeButton" in the footer.

<a name="v1.69.0"></a>
## [v1.69.0] - 2025-01-10

### Added
- New property “group” for ComboBox filter. This allows to group the items inside the ComboBox.

### Changed
- Renamed property “allowfullscreen” to “allowFullscreen” for WebPage card. The old property is still usable, but is deprecated.

<a name="v1.68.0"></a>
## [v1.68.0] - 2024-11-14

<a name="v1.67.2"></a>
## [v1.67.2] - 2024-11-04

<a name="v1.67.1"></a>
## [v1.67.1] - 2024-10-18

<a name="v1.67.0"></a>
## [v1.67.0] - 2024-09-19

<a name="v1.66.0"></a>
## [v1.66.0] - 2024-06-27

<a name="v1.65.1"></a>
## [v1.65.1] - 2024-05-06

<a name="v1.64.1"></a>
## [v1.64.1] - 2024-05-06

<a name="v1.65.0"></a>
## [v1.65.0] - 2024-05-02

<a name="v1.64.0"></a>
## [v1.64.0] - 2024-04-08

<a name="v1.63.0"></a>
## [v1.63.0] - 2024-03-07

<a name="v1.62.1"></a>
## [v1.62.1] - 2024-02-12

<a name="v1.62.0"></a>
## [v1.62.0] - 2024-02-12

<a name="v1.61.1"></a>
## [v1.61.1] - 2024-02-09

<a name="v1.60.0"></a>
## [v1.60.0] - 2023-09-22

<a name="v1.59.0"></a>
## [v1.59.0] - 2023-08-28

<a name="v1.57.0"></a>
## [v1.57.0] - 2023-07-27

<a name="v1.56.0"></a>
## [v1.56.0] - 2023-06-29

<a name="v1.55.0"></a>
## [v1.55.0] - 2023-06-01

<a name="v1.54.0"></a>
## [v1.54.0] - 2023-05-05

<a name="v1.53.1"></a>
## [v1.53.1] - 2023-04-05

<a name="v1.53.0"></a>
## [v1.53.0] - 2023-04-05

<a name="v1.52.1"></a>
## [v1.52.1] - 2023-03-08

<a name="v1.52.0"></a>
## [v1.52.0] - 2023-02-09

<a name="v1.51.0"></a>
## [v1.51.0] - 2023-01-12

<a name="v1.49.2"></a>
## [v1.49.2] - 2022-11-29

<a name="v1.49.1"></a>
## [v1.49.1] - 2022-11-21

<a name="v1.49.0"></a>
## [v1.49.0] - 2022-11-18

<a name="v1.48.1"></a>
## v1.48.1 - 2022-11-10

[Unreleased]: https://github.com/SAP/ui5-manifest/compare/v2.1.1...HEAD
[v2.1.1]: https://github.com/SAP/ui5-manifest/compare/v2.1.0...v2.1.1
[v2.1.0]: https://github.com/SAP/ui5-manifest/compare/v2.0.0...v2.1.0
[v2.0.0]: https://github.com/SAP/ui5-manifest/compare/v1.72.0...v2.0.0
[v1.72.3]: https://github.com/SAP/ui5-manifest/compare/v1.71.0...v1.72.0
[v1.71.0]: https://github.com/SAP/ui5-manifest/compare/v1.70.1...v1.71.0
[v1.70.1]: https://github.com/SAP/ui5-manifest/compare/v1.70.0...v1.70.1
[v1.70.0]: https://github.com/SAP/ui5-manifest/compare/v1.69.0...v1.70.0
[v1.69.0]: https://github.com/SAP/ui5-manifest/compare/v1.68.0...v1.69.0
[v1.68.0]: https://github.com/SAP/ui5-manifest/compare/v1.67.2...v1.68.0
[v1.67.2]: https://github.com/SAP/ui5-manifest/compare/v1.67.1...v1.67.2
[v1.67.1]: https://github.com/SAP/ui5-manifest/compare/v1.67.0...v1.67.1
[v1.67.0]: https://github.com/SAP/ui5-manifest/compare/v1.66.0...v1.67.0
[v1.66.0]: https://github.com/SAP/ui5-manifest/compare/v1.65.1...v1.66.0
[v1.65.1]: https://github.com/SAP/ui5-manifest/compare/v1.64.1...v1.65.1
[v1.64.1]: https://github.com/SAP/ui5-manifest/compare/v1.65.0...v1.64.1
[v1.65.0]: https://github.com/SAP/ui5-manifest/compare/v1.64.0...v1.65.0
[v1.64.0]: https://github.com/SAP/ui5-manifest/compare/v1.63.0...v1.64.0
[v1.63.0]: https://github.com/SAP/ui5-manifest/compare/v1.62.1...v1.63.0
[v1.62.1]: https://github.com/SAP/ui5-manifest/compare/v1.62.0...v1.62.1
[v1.62.0]: https://github.com/SAP/ui5-manifest/compare/v1.61.1...v1.62.0
[v1.61.1]: https://github.com/SAP/ui5-manifest/compare/v1.60.0...v1.61.1
[v1.60.0]: https://github.com/SAP/ui5-manifest/compare/v1.59.0...v1.60.0
[v1.59.0]: https://github.com/SAP/ui5-manifest/compare/v1.57.0...v1.59.0
[v1.57.0]: https://github.com/SAP/ui5-manifest/compare/v1.56.0...v1.57.0
[v1.56.0]: https://github.com/SAP/ui5-manifest/compare/v1.55.0...v1.56.0
[v1.55.0]: https://github.com/SAP/ui5-manifest/compare/v1.54.0...v1.55.0
[v1.54.0]: https://github.com/SAP/ui5-manifest/compare/v1.53.1...v1.54.0
[v1.53.1]: https://github.com/SAP/ui5-manifest/compare/v1.53.0...v1.53.1
[v1.53.0]: https://github.com/SAP/ui5-manifest/compare/v1.52.1...v1.53.0
[v1.52.1]: https://github.com/SAP/ui5-manifest/compare/v1.52.0...v1.52.1
[v1.52.0]: https://github.com/SAP/ui5-manifest/compare/v1.51.0...v1.52.0
[v1.51.0]: https://github.com/SAP/ui5-manifest/compare/v1.49.2...v1.51.0
[v1.49.2]: https://github.com/SAP/ui5-manifest/compare/v1.49.1...v1.49.2
[v1.49.1]: https://github.com/SAP/ui5-manifest/compare/v1.49.0...v1.49.1
[v1.49.0]: https://github.com/SAP/ui5-manifest/compare/v1.48.1...v1.49.0
