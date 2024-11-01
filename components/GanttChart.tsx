'use client';

import React, { useEffect, useState } from 'react';
import './gantt.css';
import { Inject, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { GanttComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';

// Định nghĩa kiểu dữ liệu cho dự án
type ProjectItem = {
  TaskID: number | string;
  TaskName: string;
  StartDate: Date | null;
  EndDate: Date | null;
  Duration: number;
  Progress: string | null; // Đổi thành string để chứa trạng thái
  ParentID: number | null;
  USD: string | number;
};

type GanttChartProps = {
  data: ProjectItem[];
};

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const [ganttData, setGanttData] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const totalUSD = data.reduce((acc, item) => {
      const usdValue = typeof item.USD === 'string' ? parseFloat(item.USD.replace(/[^0-9.-]+/g, "")) : item.USD;
      return acc + (usdValue || 0);
    }, 0);

    const formattedTotalUSD = `$${totalUSD.toLocaleString()}`;

    const totalRow: ProjectItem = {
      TaskID: 'Total',
      TaskName: 'Total',
      StartDate: null,
      EndDate: null,
      Duration: 0,
      Progress: null,
      ParentID: null,
      USD: formattedTotalUSD,
    };

    setGanttData([...data, totalRow]);
  }, [data]);

  const rowDataBound = (args: any) => {
    if (args.data.TaskID === 'Total') {
      args.row.style.fontWeight = 'bold';
      args.row.style.backgroundColor = '#f0f0f0';
      args.row.cells[2].innerText = '';
      args.row.cells[3].innerText = '';
      args.row.cells[4].innerText = '';
      args.row.cells[5].innerText = '';
    }
  };

  return (
    <GanttComponent
      dataSource={ganttData}
      taskFields={{
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID',
      }}
      height="500px"
      width="100%"
      toolbar={['ExpandAll', 'CollapseAll']}
      editSettings={{ allowEditing: false, allowAdding: false, allowDeleting: false }}
      allowSelection={false}
      allowSorting={false}
      enableVirtualization={true}
      loadChildOnDemand={true}
      highlightWeekends={true}
      timelineSettings={{
        topTier: { unit: 'Week', format: 'MMM dd, yyyy' },
        bottomTier: { unit: 'Day', format: 'dd' },
      }}
      style={{ color: '#333' }}
      rowDataBound={rowDataBound}
    >
      <ColumnsDirective>
        <ColumnDirective field="TaskID" headerText="ID" width="80" />
        <ColumnDirective field="TaskName" headerText="Task Name" width="150" />
        <ColumnDirective field="StartDate" headerText="Start Date" width="120" format="yMd" />
        <ColumnDirective field="EndDate" headerText="End Date" width="120" format="yMd" />
        <ColumnDirective field="Duration" headerText="Duration" width="100" textAlign="Right" />
        <ColumnDirective
          field="Progress"
          headerText="Progress"
          width="150"
          textAlign="Right"
        />
        <ColumnDirective field="USD" headerText="(USD)" width="100" textAlign="Right" />
      </ColumnsDirective>
      <Inject services={[DayMarkers]} />
    </GanttComponent>
  );
};

export default GanttChart;
