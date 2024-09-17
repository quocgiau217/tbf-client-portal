import React from 'react';
import './gantt.css';
import { Inject, Selection, DayMarkers, Edit, Toolbar } from '@syncfusion/ej2-react-gantt';
import { GanttComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data'; // Đảm bảo rằng dữ liệu này bao gồm trường 'Cost'
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';

function SyncfusionGantt() {
  return (
    <div className="ganttContainer">
      <div className="ganttHeader">
        <h2 className="text-2xl text-gray-600 font-semibold mb-4">Biểu đồ Gantt Quản lý Dự án</h2>
      </div>
      <div className="ganttChartWrapper">
        <div className="ganttTable flex">
          <GanttComponent
            dataSource={projectData}
            taskFields={{
              id: 'TaskID',
              name: 'TaskName',
              startDate: 'StartDate',
              duration: 'Duration',
              progress: 'Progress',
              child: 'SubTasks',
              // Thêm trường Số tiền (Cost)
            }}
            toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel']}
            editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }}
            height='600px'
            width='100%'
            treeColumnIndex={1}
            showColumnMenu={true}
            allowSelection={true}
            style={{ color: '#333' }}
            
          >
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID Công việc' width='80' />
              <ColumnDirective field='TaskName' headerText='Tên Công việc' width='250' />
              <ColumnDirective field='StartDate' headerText='Ngày Bắt đầu' format='dd-MMM-yy' />
              <ColumnDirective field='Duration' headerText='Thời gian' textAlign='Right' width='100' />
              {/* Định dạng cột Progress dưới dạng phần trăm */}
              <ColumnDirective field='Progress' headerText='Tiến độ' textAlign='Right' width='100' template={(props: { Progress: number }) => `${props.Progress}%`} />
              {/* Thêm cột Số tiền (Cost) */}
              <ColumnDirective field='Cost' headerText='Số tiền' textAlign='Right' width='100' format='C2' template={(props: { Cost: number }) => `${props.Cost} USD`} />
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Edit, Toolbar]} />
          </GanttComponent>
        </div>
      </div>
    </div>
  );
}

export default SyncfusionGantt;
