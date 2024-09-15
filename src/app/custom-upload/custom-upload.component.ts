import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './custom-upload.component.html',
  styleUrl: './custom-upload.component.less'
})
export class CustomUploadComponent {
  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  selectedImageFiles: { file: File, imageName: string, fileSize: number, imagePreview: string }[] = [];

  constructor(private snackBar: MatSnackBar) { }

  // Handler for file input change
  onFileChange(event: any, multiple?: 'multiple'): void {
    if (multiple) {
      const files = event.target.files as FileList | null;
      this.uploadMultipleFile(files);
    } else {
      const file = event.target.files[0] as File | null;
      this.uploadFile(file);
    }
  }

  // Handler for file drop
  onFileDrop(event: DragEvent, multiple?: 'multiple'): void {
    if (multiple) {
      event.preventDefault();
      const files = event.dataTransfer?.files as FileList | null;
      this.uploadMultipleFile(files);
    } else {
      event.preventDefault();
      const file = event.dataTransfer?.files[0] as File | null;
      this.uploadFile(file);
    }
  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent, multiple?: 'multiple'): void {
    event.preventDefault();
  }

  // Method to handle file upload
  uploadFile(file: File | null): void {
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string); // Set image preview URL
      };
      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name); // Set image name
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('Only image files are supported!', 'Close', {
        duration: 3000,
        panelClass: 'error',
      });
    }
  }

  // Method to handle multiple file upload
  uploadMultipleFile(files: FileList | null): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const fileSize = Math.round(file.size / 1024);
        const imageName = file.name;
        const reader = new FileReader();
        var imagePreview: string = null;
        reader.onload = (e) => {
          imagePreview = e.target?.result as string; // Set image preview URL
          this.selectedImageFiles.push({ file: file, fileSize: fileSize, imageName: imageName, imagePreview: imagePreview });
        };
        reader.readAsDataURL(file);
        // this.selectedImageFiles.push({ file: file, fileSize: fileSize, imageName: imageName, imagePreview: imagePreview });
        this.uploadSuccess = true;
        this.uploadError = false;
      } else {
        this.uploadSuccess = false;
        this.uploadError = true;
        this.snackBar.open('Only image files are supported!', 'Close', {
          duration: 3000,
          panelClass: 'error',
        });
      }
    }
  }

  // Method to remove the uploaded image
  removeImage(multiple?: {index: number, data: any}): void {
    if (multiple) {
      console.log(multiple)
    } else {
      this.selectedFile = null;
      this.imageName.set('');
      this.fileSize.set(0);
      this.imagePreview.set('');
      this.uploadSuccess = false;
      this.uploadError = false;
      this.uploadProgress.set(0);
    }
  }
}
