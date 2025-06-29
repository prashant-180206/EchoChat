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

export default function ThemeClassWrapper({
  children,
}: ThemeClassWrapperProps) {
  const { colorScheme } = useColorScheme();

  const themedChildren = useMemo(() => {
    function processChild(child: ReactNode): ReactNode {
      if (!isValidElement(child)) return child;

      const typedChild = child as ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;
      const originalClassName = (typedChild.props.className ?? "").trim();

      const updatedClassName = colorScheme
        ? originalClassName
            .split(" ")
            .filter(Boolean)
            .map((val) => {
              const match =
                /^(bg|border|primary|secondary|accent|muted)$/.test(val) ||
                /^(bg|border)-(primary|secondary|accent|muted|bg)$/.test(val) ||
                /^text-(primary|secondary|accent|muted|text|white|black|gray.*)$/.test(
                  val
                ) ||
                /-(primary|secondary|accent|muted|text)$/.test(val) || // <--- added suffix pattern
                /-(100|200)$/.test(val);

              if (!match) return val;
              return colorScheme === "dark"
                ? val.endsWith("-dark")
                  ? val
                  : `${val}-dark`
                : val.endsWith("-dark")
                  ? val.replace(/-dark$/, "")
                  : val;
            })
            .join(" ")
        : originalClassName;

      const processedChildren = Children.map(
        typedChild.props.children,
        processChild
      );

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
