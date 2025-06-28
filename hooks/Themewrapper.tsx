import React, {
  ReactElement,
  ReactNode,
  isValidElement,
  cloneElement,
  Children,
} from "react";
import { useColorScheme } from "nativewind";

interface ThemeClassWrapperProps {
  children: ReactNode;
}

import { useMemo } from "react";

export default function ThemeClassWrapper({ children }: ThemeClassWrapperProps) {
  const { colorScheme } = useColorScheme();

  const themedChildren = useMemo(() => {
    function processChild(child: ReactNode): ReactNode {
      if (!isValidElement(child)) return child;

      const typedChild = child as ReactElement<{ className?: string; children?: ReactNode }>;
      const originalClassName = (typedChild.props.className ?? "").trim();

      const updatedClassName =
        colorScheme
          ? originalClassName
              .split(" ")
              .filter(Boolean)
              .map((val) => {
                const match = /^(bg|text|border|primary|secondary|accent|muted|bg-[\w-]+|text-[\w-]+|border-[\w-]+)$/.test(val)
                  || /-(100|200)$/.test(val);
                if (!match) return val;
                return colorScheme === "dark"
                  ? val.endsWith("-dark") ? val : `${val}-dark`
                  : val.endsWith("-dark") ? val.replace(/-dark$/, "") : val;
              })
              .join(" ")
          : originalClassName;

      const processedChildren = Children.map(typedChild.props.children, processChild);

      return cloneElement(typedChild, {
        ...typedChild.props,
        className: updatedClassName,
        children: processedChildren,
      });
    }

    return Children.map(children, processChild);
  }, [children, colorScheme]);

  return <>{themedChildren}</>;
}
