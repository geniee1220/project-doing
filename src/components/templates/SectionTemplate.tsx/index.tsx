import React from "react";

import styledComponent from "../Template.style";
const { SectionContainer, SectionLabel, SectionInner } = styledComponent;

export interface SectionTemplateCSSProps {
  border?: boolean;
}

interface SectionTemplateProps extends SectionTemplateCSSProps {
  children?: React.ReactNode;
  sectionName?: string;
}

function SectionTemplate({
  children,
  sectionName,
  border,
}: SectionTemplateProps) {
  return (
    <SectionContainer border={border}>
      <SectionLabel>{sectionName}</SectionLabel>
      <SectionInner>{children}</SectionInner>
    </SectionContainer>
  );
}

export default SectionTemplate;
