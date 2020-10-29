/* eslint-disable require-jsdoc */

import {
  mxUtils as MxUtils,
  mxCellRenderer as MxCellRenderer,
  mxEllipse as MxEllipse,
} from "mxgraph/javascript/mxClient";
// 自定义的图形
function OrEllipseShape() {
  MxEllipse.call(this);
}
MxUtils.extend(OrEllipseShape, MxEllipse);
OrEllipseShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  MxEllipse.prototype.paintVertexShape.apply(this, arguments);
  c.setShadow(false);
  c.begin();
  c.moveTo(x, y + h / 2);
  c.lineTo(x + w, y + h / 2);
  c.end();
  c.stroke();

  c.begin();
  c.moveTo(x + w / 2, y);
  c.lineTo(x + w / 2, y + h);
  c.end();
  c.stroke();
};

MxCellRenderer.registerShape("orEllipse", OrEllipseShape);