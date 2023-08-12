import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface ObjectUrl {
  file: File;
  url: string;
  element: HTMLImageElement; // Store reference to the HTML element
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
  }

  viewImageModel: boolean = false;

  @ViewChild('fileInput', { static: false })
  set fileInputElementRef(elementRef: ElementRef<HTMLInputElement> | undefined) {
    if (elementRef) {
      this.fileInput = elementRef.nativeElement;
    }
  }

  fileInput!: HTMLInputElement;

  ngAfterViewInit() {
    if (!this.fileInput) {
      throw new Error('File input element not found.');
    }
  }

  openFileInput() {
    this.fileInput.click();
  }

  files: File[] = [];
  private objectUrls: ObjectUrl[] = [];

  mainPreview: File | undefined;

  @Output() filesSelected = new EventEmitter<File[]>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {
    this.revokeObjectUrls();
  }

  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    this.addFilesToList(selectedFiles);
    if (!this.mainPreview && this.files.length > 0) {
      this.mainPreview = this.files[0];
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const selectedFiles: FileList = event.dataTransfer.files;
    this.addFilesToList(selectedFiles);
    if (!this.mainPreview && this.files.length > 0) {
      this.mainPreview = this.files[0];
    }
  }

  addFilesToList(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    this.filesSelected.emit(this.files);
  }

  removeFile() {
    if (this.mainPreview) {
      const index = this.files.indexOf(this.mainPreview);
      if (index !== -1) {
        this.files.splice(index, 1);
        this.mainPreview = this.files.length > 0 ? this.files[0] : undefined;
      }
    }
  }

  isLast(mainPreview: File): boolean {
    return this.files[this.files.length - 1] === mainPreview ? true : false;
  }

  isFirst(mainPreview: File): boolean {
    return this.files[0] === mainPreview ? true : false;
  }

  previousImg() {
    if (this.mainPreview) {
      const index = this.files.indexOf(this.mainPreview);
      index !== 0 ? (this.mainPreview = this.files[index - 1]) : '';
    }
  }

  nextImg() {
    if (this.mainPreview) {
      const index = this.files.indexOf(this.mainPreview);
      index !== this.files.length - 1 ? (this.mainPreview = this.files[index + 1]) : '';
    }
  }

  removeMainPreview() {
    this.mainPreview = undefined;
  }

  getPreviewImageUrl(file: File): SafeUrl {
    const existingObjectUrl = this.objectUrls.find(objUrl => objUrl.file === file);
    if (existingObjectUrl) {
      return this.sanitizer.bypassSecurityTrustUrl(existingObjectUrl.url);
    }

    const objectUrl = URL.createObjectURL(file);
    const element: HTMLImageElement = document.createElement('img'); // Create an element (example: img)
    element.src = objectUrl; // Set the src attribute
    // You can customize the element creation and attribute assignment based on your specific use case

    this.objectUrls.push({ file, url: objectUrl, element }); // Store the reference to the element
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

  revokeObjectUrls() {
    for (const objectUrl of this.objectUrls) {
      URL.revokeObjectURL(objectUrl.url);
      objectUrl.element.remove(); // Remove the element from the DOM
    }
    this.objectUrls = [];
  }


  changeMainPreview(index: number) {
    this.mainPreview = this.files[index];
  }
}
