import React from "react";
import { ConfigProvider } from "antd";

const colors = {
  primary: "#4FBA70",
  colorFormItemBg: "#F4F5F6",
  colorFormItemPlaceholder: "#838795",
};

const AppProvider = ({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: unknown;
}) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.primary,
            fontFamily: fontFamily as string,
            fontSize: 14,
          },
          components: {
            Form: {
              labelFontSize: 16,
              labelHeight: 24,
              verticalLabelPadding: "0 0 8px 0",
              itemMarginBottom: 24,
            },
            Input: {
              colorBgContainer: colors.colorFormItemBg,
              colorTextPlaceholder: colors.colorFormItemPlaceholder,
              controlHeightSM: 50,
              controlHeight: 60,
              fontSize: 14,
              controlOutlineWidth: 0.5,
              borderRadiusSM: 12,
              borderRadius: 12,
              colorBorder: colors.colorFormItemBg,
            },
            Button: {
              controlHeight: 60,
              borderRadius: 99,
              fontSize: 18,
              borderColorDisabled: colors.colorFormItemBg,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  );
};

export default AppProvider;
