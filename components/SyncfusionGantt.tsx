import * as React from 'react';
import { GanttComponent, Inject, ColumnsDirective, ColumnDirective, Selection, DayMarkers, Edit, Toolbar } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';
import styles from './SyncfusionGantt.module.css';  // Nếu bạn dùng CSS Modules

export default function SyncfusionGantt() {
  return (
    <div className={`${styles.ganttContainer}`} style={{ color: '#333', backgroundColor: '#fff' }}>
      <h2 className="text-2xl font-semibold mb-4">Project Management Gantt Chart</h2>
      <GanttComponent 
        dataSource={projectData} 
        taskFields={{
          id: 'TaskID',
          name: 'TaskName',
          startDate: 'StartDate',
          duration: 'Duration',
          progress: 'Progress',
          child: 'SubTasks',
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
          <ColumnDirective field='TaskID' headerText='Task ID' width='80'/>
          <ColumnDirective field='TaskName' headerText='Task Name' width='250'/>
          <ColumnDirective field='StartDate' headerText='Start Date' format='dd-MMM-yy'/>
          <ColumnDirective field='Duration' headerText='Duration' textAlign='Right' width='100'/>
          <ColumnDirective field='Progress' headerText='Progress' textAlign='Right' width='100'/>
        </ColumnsDirective>
        <Inject services={[Selection, DayMarkers, Edit, Toolbar]} />
      </GanttComponent>
    </div>
  );
}
