'use strict';

System.register(['app/plugins/sdk', 'app/core/core', 'lodash', './libs/g2.min'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, appEvents, _, G2, _createClass, G2Ctrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_libsG2Min) {
      G2 = _libsG2Min.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('G2Ctrl', G2Ctrl = function (_MetricsPanelCtrl) {
        _inherits(G2Ctrl, _MetricsPanelCtrl);

        // eslint-disable-line

        function G2Ctrl($scope, $injector) {
          _classCallCheck(this, G2Ctrl);

          var _this = _possibleConstructorReturn(this, (G2Ctrl.__proto__ || Object.getPrototypeOf(G2Ctrl)).call(this, $scope, $injector));

          var panelDefaults = {
            G2DataHandler: '\nconsole.log(dataList);\nconst data = [\n  { genre: \'Sports\', sold: 275 },\n  { genre: \'Strategy\', sold: 115 },\n  { genre: \'Action\', sold: 120 },\n  { genre: \'Shooter\', sold: 350 },\n  { genre: \'Other\', sold: 150 }\n];\nchart.source(data);\nchart.interval().position(\'genre*sold\').color(\'genre\');\nchart.render();\n'
          };

          _.defaults(_this.panel, panelDefaults);

          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-initialized', _this.render.bind(_this));
          return _this;
        }

        _createClass(G2Ctrl, [{
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.data = dataList || this.data;
            this.render();
          }
        }, {
          key: 'onDataError',
          value: function onDataError() {
            this.data = [];
            this.render();
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            // this.addEditorTab('数据', 'public/plugins/ljy-g2-panel/partials/editer-metric.html', 2);
            this.addEditorTab('G2图表配置', 'public/plugins/ljy-g2-panel/partials/editor-g2.html', 3);
          }
        }, {
          key: 'editorG2Data',
          value: function editorG2Data() {
            this.render();
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            var chart = null;
            function render() {
              var height = ctrl.height || 200;
              if (chart) {
                chart.destroy();
              }
              chart = new G2.Chart({
                container: 'g2_' + ctrl.panel.id,
                forceFit: true,
                height: height
              });
              try {
                // eslint-disable-next-line no-new-func
                var handler = new Function('dataList', 'chart', ctrl.panel.G2DataHandler);
                handler(ctrl.data, chart);
              } catch (e) {
                appEvents.emit('alert-warning', ['DataHandler代码运行错误', e.message || e]);
                throw e;
              }
            }

            ctrl.events.on('render', function () {
              render();
              ctrl.renderingCompleted();
            });
          }
        }]);

        return G2Ctrl;
      }(MetricsPanelCtrl));

      _export('G2Ctrl', G2Ctrl);

      G2Ctrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=g2_ctrl.js.map
