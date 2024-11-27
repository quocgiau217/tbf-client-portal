'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  Status: string | null; // Đổi từ Progress thành Status
  ParentID: number | null;
  USD: string | number;
};

type GanttChartProps = {
  data: ProjectItem[];
};

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const [ganttData, setGanttData] = useState<ProjectItem[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const ganttRef = useRef<GanttComponent | null>(null);

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
      Status: null,
      ParentID: null,
      USD: formattedTotalUSD,
    };

    setGanttData([...data, totalRow]);
  }, [data]);

  // Tạo useEffect để cập nhật bảng Gantt khi `showCompleted` thay đổi
  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.refresh(); // Làm mới bảng Gantt để áp dụng thay đổi
    }
  }, [showCompleted]);

  const rowDataBound = (args: any) => {
    if (args.data.Status === '4-Completed' && !showCompleted) {
      args.row.style.display = 'none'; // Ẩn các hàng hoàn thành nếu `showCompleted` là false
    }
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
    <div>
      <button
        onClick={() => setShowCompleted(!showCompleted)}
        style={{
          backgroundColor: showCompleted ? '#28a745' : '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px',
          transition: 'background-color 0.3s, transform 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = showCompleted ? '#218838' : '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = showCompleted ? '#28a745' : '#007bff')}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {showCompleted ? 'Ẩn Hoàn Thành' : 'Hiển Thị Hoàn Thành'}
      </button>
      <GanttComponent
        ref={ganttRef}
        dataSource={ganttData}
        taskFields={{
          id: 'TaskID',
          name: 'TaskName',
          startDate: 'StartDate',
          endDate: 'EndDate',
          duration: 'Duration',
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
          <ColumnDirective field="Status" headerText="Status" width="150" textAlign="Right" />
          <ColumnDirective field="USD" headerText="(USD)" width="100" textAlign="Right" />
        </ColumnsDirective>
        <Inject services={[DayMarkers]} />
      </GanttComponent>
    </div>
  );
};

export default GanttChart;
