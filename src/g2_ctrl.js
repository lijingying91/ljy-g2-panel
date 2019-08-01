/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
import { MetricsPanelCtrl } from 'app/plugins/sdk'; // eslint-disable-line
import { appEvents } from 'app/core/core'; // eslint-disable-line
import _ from 'lodash';
import G2 from './libs/g2.min'; // eslint-disable-line

export class G2Ctrl extends MetricsPanelCtrl { // eslint-disable-line

  constructor($scope, $injector) {
    super($scope, $injector);

    const panelDefaults = {
      G2DataHandler: `
console.log(dataList);
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];
chart.source(data);
chart.interval().position('genre*sold').color('genre');
chart.render();
`,
    };

    _.defaults(this.panel, panelDefaults);

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
  }

  onDataReceived(dataList) {
    this.data = dataList || this.data;
    this.render();
  }

  onDataError() {
    this.data = [];
    this.render();
  }

  onInitEditMode() {
    // this.addEditorTab('数据', 'public/plugins/ljy-g2-panel/partials/editer-metric.html', 2);
    this.addEditorTab('G2图表配置', 'public/plugins/ljy-g2-panel/partials/editor-g2.html', 3);
  }

  editorG2Data() {
    this.render();
  }

  link(scope, elem, attrs, ctrl) {
    let chart = null;
    function render() {
      let height = ctrl.height || 200;
      if (chart) {
        chart.destroy();
      }
      chart = new G2.Chart({
        container: `g2_${ctrl.panel.id}`,
        forceFit: true,
        height,
      });
      try {
        // eslint-disable-next-line no-new-func
        let handler = new Function('dataList', 'chart', ctrl.panel.G2DataHandler);
        handler(ctrl.data, chart);
      } catch (e) {
        appEvents.emit('alert-warning', ['DataHandler代码运行错误', e.message || e]);
        throw e;
      }
    }

    ctrl.events.on('render', () => {
      render();
      ctrl.renderingCompleted();
    });
  }
}

G2Ctrl.templateUrl = 'module.html';
