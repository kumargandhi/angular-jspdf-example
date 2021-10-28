import { Component } from '@angular/core';
import { CellConfig, jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular JSPDF Example';

  users = [
    {
      uid: '1',
      first: 'Mark',
      last: 'Otto',
      handle: '@mdo'
    },
    {
      uid: '2',
      first: 'Jacob',
      last: 'Thornton',
      handle: '@fat'
    },
    {
      uid: '2',
      first: 'Larry the Bird',
      last: 'Thornton',
      handle: '@twitter'
    }
  ];

  exportDataToPDF() {
    // Creating a unique file name for my PDF
    const fileName = this.title.replace(' ', '_') + '_' + Math.floor((Math.random() * 1000000) + 1) + '.pdf';
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth(this.title) / 2);
    doc.text(this.title, titleXPos, 20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.table(10, 35, this._getDataForPdfTable(), this._createHeadersForPdfTable([
      'uid', 'first', 'last', 'handle'
    ]), { autoSize: false });
    doc.save(fileName);
  }

  private _createHeadersForPdfTable(keys: string[]) {
    const result: CellConfig[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        name: keys[i],
        prompt: keys[i],
        width: 55,
        align: 'center',
        padding: 10
      });
    }
    return result;
  }

  private _getDataForPdfTable() {
    const data = [];
    for (let i = 0; i < this.users.length; i++) {
      data.push({
        uid: this.users[i].uid,
        first: this.users[i].first,
        last: this.users[i].last,
        handle: this.users[i].handle,
      });
    }
    return data;
  }
}
