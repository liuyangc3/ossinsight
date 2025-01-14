import React from "react";
import { BarSeries, Dataset, EChartsx, Once, Tooltip } from "@djagger/echartsx";
import { useAnalyzeChartContext } from "../context";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useReversed } from "./hooks";
import { AxisBase, formatDate } from "./base";
import { Title } from "./ui";

interface BarsProps {
  color: string;
  title: string;
  icon: React.ReactNode;
  dayKey?: string;
  dayValueKey: string;
  totalKey: string;
}

export default function Bars({ color, icon, title, dayValueKey, dayKey = 'current_period_day', totalKey }: BarsProps) {
  const { data } = useAnalyzeChartContext<any>();

  return (
    <Stack direction="row">
      <Box minWidth={96} display="flex" flexDirection="column" justifyContent="center">
        <Title icon={icon} title={title} />
        <Typography color={color} fontWeight="bold" fontSize={24}>{data.data?.data[0][totalKey]}</Typography>
      </Box>
      <Box flex={1} position="relative" height="74px">
        <EChartsx style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
                  init={{ renderer: 'canvas' }} theme="dark">
          <Once>
            <AxisBase />
            <Tooltip trigger="axis" axisPointer={{}}
                     formatter={([params]) => `${params.marker} ${formatDate(params.value[dayKey])}: <b>${params.value[dayValueKey]}</b> ${title}`} />
            <BarSeries encode={{ x: 'idx', y: dayValueKey }} color={color} barMaxWidth={8} />
          </Once>
          <Dataset source={useReversed(data.data?.data ?? [])} />
        </EChartsx>
      </Box>
    </Stack>
  );
}
