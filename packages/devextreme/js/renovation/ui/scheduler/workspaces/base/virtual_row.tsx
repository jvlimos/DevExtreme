import {
  Component, ComponentBindings, CSSAttributes, JSXComponent, OneWay,
} from '@devextreme-generator/declarations';
import { renderUtils } from '../../../../../__internal/scheduler/r1/utils/index';
import { RowProps, Row } from './row';
import { VirtualCell } from './virtual_cell';

export const viewFunction = ({
  props: {
    leftVirtualCellWidth,
    rightVirtualCellWidth,
    leftVirtualCellCount,
    rightVirtualCellCount,
  },
  classes,
  style,
  virtualCells,
}: VirtualRow): JSX.Element => (
  <Row
    styles={style}
    className={classes}
    leftVirtualCellWidth={leftVirtualCellWidth}
    rightVirtualCellWidth={rightVirtualCellWidth}
    leftVirtualCellCount={leftVirtualCellCount}
    rightVirtualCellCount={rightVirtualCellCount}
  >
    {virtualCells.map((_, index) => (
      <VirtualCell key={index.toString()} />
    ))}
  </Row>
);

@ComponentBindings()
export class VirtualRowProps extends RowProps {
  @OneWay() height?: number;

  @OneWay() leftVirtualCellWidth = 0;

  @OneWay() rightVirtualCellWidth = 0;

  @OneWay() leftVirtualCellCount?: number;

  @OneWay() rightVirtualCellCount?: number;

  @OneWay() cellsCount = 1;
}

@Component({
  defaultOptionRules: null,
  view: viewFunction,
})
export class VirtualRow extends JSXComponent(VirtualRowProps) {
  get style(): CSSAttributes {
    const { height } = this.props;
    const { style } = this.restAttributes;

    return renderUtils.addHeightToStyle(height, style);
  }

  get classes(): string {
    const { className } = this.props;

    return `dx-scheduler-virtual-row ${className}`;
  }

  get virtualCells(): unknown[] {
    const { cellsCount } = this.props;

    return [...Array(cellsCount)] as unknown[];
  }
}
