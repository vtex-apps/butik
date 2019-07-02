# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `yarn.lock` to project folder

## [1.2.3] - 2019-06-18

### Fixed

- Design tokens reference to skuSelectorContainer of null

### Added
- Yarn Lock to react folder

## [1.2.2] - 2019-06-14

### Added
- Add design tokens for sku selector container

## [1.2.1] - 2019-03-08

### Fixed
- Increase fault tolerance for video rendering in Carousel

## [1.2.0] - 2019-02-22

### Changed
- Add support for receiving youtubeApiKey and rendering Youtube Videos

## [1.1.7] - 2019-01-09

### Changed
- Start script from package.json

### Added
- Unavailable prop to ProductPrice

## [1.1.6] - 2019-01-08

### Fix
- Mutation in SKUSelector prop

## [1.1.5] - 2019-01-08

### Changed
- Update SKUSelector to ignore invalid selectedVariations prop
- vtex-sku-selector__item bottom margin

### Added
- Minimum price at each state for SKUSelector
- ShowStartingAt and startingAtClass props to ProductPrice
- price.startingAtLabel intl message

## [1.1.4] - 2019-01-07

### Removed
- Console.log from BlurredLoader
- Demo folder

### Changed
- Babel config files
- ProductDescription to show description and specifications independently

## [1.1.3] - 2019-01-04

### Added
- Docz based documentation for BlurredLoader, Carousel, FixedButton, GradientCollapse, Image Resizer, ProductDescription, SKUSelector and Video components
- Prop description to Video component

### Fixed
- Typo in Video component propTypes
- SKUSelector bug in the return value of allVariationsSelected

### Changed
- Improved BlurredLoader load effect
- Improved SKUSelector prop description
- GradientCollapse inside ProductDescription removed
- babelrc presents
- Collapse showMore and showLess intl message id

## [1.1.2] - 2019-01-03
## [1.1.1] - 2019-01-03

## Fixed

- Carousel showing next image with small images

## [1.1.0] - 2018-12-29

### Fixed

- Update SKUSelector selectedVariations PropType to object instead of array

## [1.0.24] - 2018-12-29

### Fixed

- Error when no initialState is provided to the SKUSelector

## [1.0.23] - 2018-12-28

### Changed

- Change SKUSelector onChange to send selectedVariations instead of the hash

## [1.0.22] - 2018-12-28

### Changed

- Change SKUSelector prop selectedVariationsHash to selectedVariations

## [1.0.21] - 2018-12-28

### Fixed

- SKUSelector error when no variations are provided

### Added

- SKUSelector to IO

## [1.0.20] - 2018-12-28

### Added

- External control to SKUSelector initial state
- Additional property to onChange on SKUSelector that provides the current state hash

## [1.0.19] - 2018-12-28

### Added

- Unavailable sku support to SKUSelector component
- Select variariation support to SKUSelector component
- sku-selector.select-warning Intl message

## [1.0.18] - 2018-12-27

### Removed

- IO Dependency to NoSSR in FixedButton component

## [1.0.17] - 2018-12-27

### Fixed

- FixedButton export to IO and NPM

## [1.0.16] - 2018-12-27

### Fixed

- Intl JSON format 

## [1.0.15] - 2018-12-27

### Added

- Add FixedButton component
- TechnicalSpecifications.title intl message

## [1.0.14] - 2018-12-26

### Fixed

- Intl json files format

## [1.0.13] - 2018-12-26

### Added

- Messages builder support
- Intl json files to NPM

## [1.0.12] - 2018-12-26

### Changed

- Currency option is passed to ProductPrice components through props, instead of context

## [1.0.11] - 2018-12-26

### Fix

- Add ProductPrice to npm index
- Typo in BlurredLoader export

## [1.0.10] - 2018-12-26

### Added

- react-html-parser to npm dependencies

## [1.0.9] - 2018-12-26

### Added

- Components can be imported like: import { ProductImages, ProductDetails } from '@vtex/butik'

## [1.0.8] - 2018-12-26

## [1.0.7] - 2018-12-26

## [1.0.6] - 2018-12-22

## [1.0.5] - 2018-12-22

## [1.0.4] - 2018-12-21

## [1.0.3] - 2018-12-21

## [1.0.3-1] - 2018-12-21

## [1.0.3-0] - 2018-12-21

## [1.0.2] - 2018-12-21

### Added

- Package.json for react folder

## [1.0.1] - 2018-12-21

### Added

- BlurredLoader Component
- Carousel Component
- GradientCollapse Component
- ImageResizer Component
- ProductDescription Component
- ProductName Component
- ProductPrice Component
- Video Component

### Changed

- Directory structure to work inside IO
