import type { InfernoEffect } from '@devextreme/runtime/inferno';
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import type { JSXTemplate, RefObject } from '@devextreme-generator/declarations';
import { getTemplate } from '@ts/core/r1/utils/index';
import type { VNode } from 'inferno';
import { createComponentVNode } from 'inferno';

import type { CellTemplateProps } from '../types';
import { DateTableBody } from './date_table_body';
import { DateTableCellBase } from './date_table_cell_base';
import type { LayoutProps } from './layout_props';
import { LayoutDefaultProps } from './layout_props';
import { Table } from './table';

export interface DateTableProps extends LayoutProps {
  cellTemplate: JSXTemplate<CellTemplateProps>;
  tableRef?: RefObject<HTMLTableElement>;
}

export const DateTableDefaultProps: DateTableProps = {
  ...LayoutDefaultProps,
  // @ts-expect-error Different types between React and Inferno
  cellTemplate: DateTableCellBase,
};

export class DateTable extends InfernoWrapperComponent<DateTableProps> {
  createEffects(): InfernoEffect[] {
    return [createReRenderEffect()];
  }

  render(): VNode {
    const {
      addDateTableClass,
      tableRef,
      viewData,
      width,
      cellTemplate,
      dataCellTemplate,
      groupOrientation,
      addVerticalSizesClassToRows,
      ...restProps
    } = this.props;
    const classes = addDateTableClass ? 'dx-scheduler-date-table' : undefined;
    const topVirtualRowHeight = viewData.topVirtualRowHeight ?? 0;
    const bottomVirtualRowHeight = viewData.bottomVirtualRowHeight ?? 0;
    const leftVirtualCellWidth = viewData.leftVirtualCellWidth ?? 0;
    const rightVirtualCellWidth = viewData.rightVirtualCellWidth ?? 0;
    const virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
    const cellTemplateComponent = getTemplate(cellTemplate);
    const dataCellTemplateComponent = getTemplate(dataCellTemplate);

    return createComponentVNode(2, Table, {
      ...restProps,
      tableRef,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      leftVirtualCellCount: viewData.leftVirtualCellCount,
      rightVirtualCellCount: viewData.rightVirtualCellCount,
      virtualCellsCount,
      className: classes,
      width,
      children: createComponentVNode(2, DateTableBody, {
        cellTemplate: cellTemplateComponent,
        viewData,
        dataCellTemplate: dataCellTemplateComponent,
        leftVirtualCellWidth,
        rightVirtualCellWidth,
        groupOrientation,
        addVerticalSizesClassToRows,
      }),
    });
  }
}
DateTable.defaultProps = DateTableDefaultProps;
