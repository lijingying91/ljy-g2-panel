# Grafana G2 panel
Grafana G2 图表展示插件。
antV G2 panel for grafana
## 用法Usage
1. `$ npm install`
2. `$ grunt`
3. 重启 **Grafana-server**. restart **Grafana-server**
4. 添加G2 panel. Add a G2 panel.
5. 编辑G2的配置项. Add your g2 option to in edit page.
```
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
```

## 提示Tips
1. 支持`dataList`参数获取query的值。Response belongs to your url has been saved as **dataList**.