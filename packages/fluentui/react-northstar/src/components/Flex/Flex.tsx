import { getElementType, useUnhandledProps, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { commonPropTypes, UIComponentProps, ChildrenComponentProps } from '../../utils';
import { ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import FlexItem from './FlexItem';

export interface FlexProps extends UIComponentProps, ChildrenComponentProps {
  /** Defines if container should be inline element. */
  inline?: boolean;

  /** Sets vertical flow direction. */
  column?: boolean;

  /** Allows overflow items to wrap on the next container's line. */
  wrap?: boolean;

  /** Controls items alignment in horizontal direction. */
  hAlign?: 'start' | 'center' | 'end' | 'stretch';

  /** Controls items alignment in vertical direction. */
  vAlign?: 'start' | 'center' | 'end' | 'stretch';

  /** Defines strategy for distributing remaining space between items. */
  space?: 'around' | 'between' | 'evenly';

  /** Defines gap between each two adjacent child items. */
  gap?: 'gap.smaller' | 'gap.small' | 'gap.medium' | 'gap.large';

  /** Defines container's padding. */
  padding?: 'padding.medium';

  /** Enables debug mode. */
  debug?: boolean;

  /** Orders container to fill all parent's space available. */
  fill?: boolean;
}

export type FlexStylesProps = Pick<
  FlexProps,
  'column' | 'debug' | 'fill' | 'gap' | 'hAlign' | 'inline' | 'padding' | 'space' | 'vAlign' | 'wrap'
>;

const Flex: React.FC<WithAsProp<FlexProps>> & {
  className: string;
  handledProps: (keyof FlexProps)[];
  Item: typeof FlexItem;
} = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Flex.displayName, context.telemetry);
  setStart();

  const {
    children,
    className,
    column,
    debug,
    design,
    fill,
    gap,
    hAlign,
    inline,
    padding,
    space,
    styles,
    variables,
    vAlign,
    wrap,
  } = props;

  const { classes } = useStyles<FlexStylesProps>(Flex.displayName, {
    className: Flex.className,
    mapPropsToStyles: () => ({
      column,
      debug,
      fill,
      gap,
      hAlign,
      inline,
      padding,
      space,
      vAlign,
      wrap,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Flex.handledProps, props);

  const content = React.Children.map(children, child => {
    const isFlexItemElement: boolean = _.get(child, 'type.__isFlexItem');

    return isFlexItemElement
      ? React.cloneElement(child as React.ReactElement, {
          flexDirection: column ? 'column' : 'row',
        })
      : child;
  });
  const element = (
    <ElementType className={classes.root} {...unhandledProps}>
      {content}
    </ElementType>
  );
  setEnd();

  return element;
};

Flex.className = 'ui-flex';
Flex.displayName = 'Flex';

Flex.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    content: false,
  }),

  inline: PropTypes.bool,

  column: PropTypes.bool,

  wrap: PropTypes.bool,

  hAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  vAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),

  space: PropTypes.oneOf(['around', 'between', 'evenly']),

  gap: PropTypes.oneOf(['gap.smaller', 'gap.small', 'gap.medium', 'gap.large']),

  padding: PropTypes.oneOf(['padding.medium']),
  fill: PropTypes.bool,

  debug: PropTypes.bool,
};
Flex.handledProps = Object.keys(Flex.propTypes) as any;

Flex.Item = FlexItem;

/**
 * A Flex is a layout component that arranges group of items aligned towards common direction (either row or column).
 */
export default withSafeTypeForAs<typeof Flex, FlexProps>(Flex);
