import { Component, ViewChild } from '@angular/core';
// import filepond module
import { FilePondModule, registerPlugin } from "ngx-filepond";

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { FilePondComponent } from "ngx-filepond";
import { FilePondOptions } from "filepond";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FilePondModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.less'
})
export class UploadComponent {
  @ViewChild("myPond") myPond: FilePondComponent;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: "Drop files here...",
  };

  pondFiles: FilePondOptions["files"] = [
    {
      source: "assets/photo.jpeg",
      options: {
        type: "local",
      },
    },
  ];

  pondHandleInit() {
    console.log("FilePond has initialised", this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log("A file was added", event);
  }

  pondHandleActivateFile(event: any) {
    console.log("A file was activated", event);
  }

  onRemoveFile(event: any) {
    console.log("A file was removed", event);
  }

}
