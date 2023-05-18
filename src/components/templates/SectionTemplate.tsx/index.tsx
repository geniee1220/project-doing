import React from "react";

import styledComponent from "../Template.style";
const { SectionContainer, SectionLabel, SectionInner } = styledComponent;

export interface SectionTemplateCSSProps {
  border?: boolean;
  contentsWidth?: string;
}

interface SectionTemplateProps extends SectionTemplateCSSProps {
  children?: React.ReactNode;
  sectionName?: string | React.ReactNode;
  style?: React.CSSProperties;
}

function SectionTemplate({
  children,
  sectionName,
  contentsWidth,
  border,
  style,
}: SectionTemplateProps) {
  return (
    <SectionContainer
      contentsWidth={contentsWidth}
      border={border}
      style={style}
    >
      <SectionLabel>{sectionName}</SectionLabel>
      <SectionInner>{children}</SectionInner>
    </SectionContainer>
  );
}

export default SectionTemplate;
