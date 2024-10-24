"use client";

import React from 'react';
import './gantt.css';
import { Inject, Selection, DayMarkers, Edit, Toolbar } from '@syncfusion/ej2-react-gantt';
import { GanttComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';

// Định nghĩa kiểu dữ liệu cho dự án
type ProjectItem = {
  TaskID: number;
  TaskName: string;
  StartDate: Date;
  EndDate: Date;
  Duration: number;
  Progress: number;
  ParentID: number | null;
  USD: string; // Thêm thuộc tính USD để hiển thị
};

type GanttChartProps = {
  data: ProjectItem[];
};

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  return (
    <GanttComponent
  dataSource={data}
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
  width='100%'
  toolbar={['ExpandAll', 'CollapseAll']}
  editSettings={{ allowEditing: false, allowAdding: false, allowDeleting: false }}
  allowSelection={false}
  allowSorting={false}
  enableVirtualization={true}
  loadChildOnDemand={true}
  highlightWeekends={true}
  timelineSettings={{
    topTier: { unit: 'Week', format: 'MMM dd, yyyy' },
    bottomTier: { unit: 'Day', format: 'dd' }
  }}
  style={{ color: '#333' }}
>
  <ColumnsDirective>
    <ColumnDirective field='TaskID' headerText='ID' width='80' />
    <ColumnDirective field='TaskName' headerText='Task Name' width='150' />
    <ColumnDirective field='StartDate' headerText='Start Date' width='120' format='yMd' />
    <ColumnDirective field='EndDate' headerText='End Date' width='120' format='yMd' />
    <ColumnDirective field='Duration' headerText='Duration' width='100' textAlign='Right' />
    <ColumnDirective field='Progress' headerText='Progress' width='80' template={(props: { Progress: number }) => `${props.Progress}%`} textAlign='Right'/>
    <ColumnDirective field='USD' headerText='(USD)' width='100' />
  </ColumnsDirective>
  <Inject services={[DayMarkers]} />
</GanttComponent>

  );
};

export default GanttChart; // Export mặc định
