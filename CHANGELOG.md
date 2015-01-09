## 2.0.4 (2015-1-9)

Features:
  - Include files to ignore for bower and npm

## 2.0.3 (2015-1-9)

Bugfixes:
  - License
  - Update min
  - Missing showNewMessage

Features:
  - showMessages doesn't take arguments

## 2.0.2 (2014-12-23)

Bugfixes:
  - Update min

## 2.0.1 (2014-12-23)

Bugfixes:
  - Remove console logs

Features:
  - Fix typo in comment
  - Allow for both '$intercom' or 'Intercom' services
  - Rename _extend to $$defineMethod
  - Add more comments explaining the code
  - Warn the use if user use both $intercom and Intercom

## 2.0.0 (2014-12-22)

Bugfixes:
  - Imporoved handling async loading Intercom
  - Update async `scriptUrl`

Features:
  - UMD support for Require.js and CommonJS support
  - Optional safe digest calls with methods preapended with '$'
  - Register callbacks with safe digest call using `$intercom.$on`
  - Register callbacks without safe digest call using `$intercom.on`
  - Extend `$intercom` with `$intercom._extend` for future api updates

## 1.0.0 (2014-12-15)

Bugfixes:
  - Janky async timeout handling of intercom's script load
  - Correct `show`
  - Update Version

## 0.0.7
  - Initial release
