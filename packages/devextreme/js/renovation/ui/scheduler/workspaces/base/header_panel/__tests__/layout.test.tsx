import { shallow } from 'enzyme';
import {
  viewFunction as LayoutView,
  HeaderPanelLayout,
  HeaderPanelLayoutProps,
} from '../layout';
import * as MigratedUtils from '../../../../../../../__internal/scheduler/r1/utils/index';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../../../../../../__internal/scheduler/r1/const';
import { GroupPanel } from '../../group_panel/group_panel';
import { DateHeaderLayout } from '../date_header/layout';
import { TimelineDateHeaderLayout } from '../../../timeline/header_panel/date_header/layout';
import { DateHeaderData } from '../../../types';

const isHorizontalGroupingApplied = jest.spyOn(MigratedUtils, 'isHorizontalGroupingApplied');

describe('HeaderPanelLayoutLayout', () => {
  const dateHeaderData: DateHeaderData = {
    dataMap: [[]],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
  };

  describe('Render', () => {
    const render = (viewModel) => shallow(LayoutView({
      isHorizontalGrouping: false,
      ...viewModel,
      props: {
        ...new HeaderPanelLayoutProps(),
        dateHeaderData,
        groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        groups: [],
        ...viewModel.props,
      },
    }) as any);

    it('should render DateHeader and should not render GroupPanel in basic case', () => {
      const dateCellTemplate = () => null;
      const timeCellTemplate = () => null;
      const layout = render({
        props: {
          dateCellTemplate,
          timeCellTemplate,
        },
      });

      const groupPanel = layout.find(GroupPanel);
      expect(groupPanel.exists())
        .toBe(false);

      const dateHeader = layout.find(DateHeaderLayout);
      expect(dateHeader.exists())
        .toBe(true);

      expect(dateHeader.props())
        .toEqual({
          dateHeaderData,
          dateCellTemplate,
          timeCellTemplate,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groups: [],
          groupByDate: false,
        });
    });

    it('should not render DateHeader if "isRenderDateHeader" is false', () => {
      const layout = render({ props: { isRenderDateHeader: false } });

      const dateHeader = layout.find(DateHeaderLayout);
      expect(dateHeader.exists())
        .toBe(false);
    });

    it('should render DateHeader after GroupPanel in case of horizontal grouping', () => {
      const layout = render({ isHorizontalGrouping: true });

      expect(layout.children())
        .toHaveLength(2);
      expect(layout.childAt(0).is(GroupPanel))
        .toBe(true);
      expect(layout.childAt(1).is(DateHeaderLayout))
        .toBe(true);
    });

    it('should render DateHeader before GroupPanel in case of grouping by date', () => {
      const layout = render({ isHorizontalGrouping: true, props: { groupByDate: true } });

      expect(layout.children())
        .toHaveLength(2);
      expect(layout.childAt(0).is(DateHeaderLayout))
        .toBe(true);
      expect(layout.childAt(1).is(GroupPanel))
        .toBe(true);
    });

    it('should pass correct props to GroupPanel', () => {
      const resourceCellTemplate = () => null;
      const groupPanelProps = {
        groupByDate: false,
        groups: [],
        resourceCellTemplate,
        groupPanelData: {
          groupPanelItems: [],
          baseColSpan: 34,
        },
      };

      const layout = render({
        isHorizontalGrouping: true,
        props: groupPanelProps,
      });

      const groupPanel = layout.find(GroupPanel);

      expect(groupPanel.props())
        .toEqual({
          groupByDate: false,
          groups: [],
          resourceCellTemplate,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupPanelData: {
            groupPanelItems: [],
            baseColSpan: 34,
          },
        });
    });

    it('should render correct Date Header', () => {
      const layout = render({ props: { dateHeaderTemplate: TimelineDateHeaderLayout } });

      expect(layout.find(TimelineDateHeaderLayout).exists())
        .toBe(true);
    });
  });

  describe('Logic', () => {
    describe('Getters', () => {
      describe('isHorizontalGrouping', () => {
        it('should call "isHorizontalGroupingApplied" with correct parameters', () => {
          const groups = [];
          const layout = new HeaderPanelLayout({
            groupOrientation: VERTICAL_GROUP_ORIENTATION,
            groups,
            dateHeaderData,
          });

          expect(layout.isHorizontalGrouping)
            .toBe(false);

          expect(isHorizontalGroupingApplied)
            .toHaveBeenCalledWith(groups, VERTICAL_GROUP_ORIENTATION);
        });
      });
    });
  });
});
