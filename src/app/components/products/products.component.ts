import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, throwError, timeout } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  fileToUpload: File | null = null;
  products: any[] = [];
  isAscending: boolean = true;
  isLoading: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;
  selectedProduct: any = null;
  fileType: string = "";
  wrongFileType: boolean = false;
  startedFileUpload: boolean = false;
  isUploadComplete: boolean = false;
  isEncryptedFile: boolean = false;
  maxFileSizeInBytes: any;
  scaledImage: any;



  constructor(public commonService: CommonServiceService, private sanitizer: DomSanitizer,public router:Router) { }

  ngOnInit() {
    this.getProductData();
  }
  //sorting by prize
  sortByPrice() {
    if (this.isAscending) {
      this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products.sort((a, b) => b.price - a.price);
    }
    this.isAscending = !this.isAscending;
  }

  handleFileInput(event: Event): void {
    const allowedTypes = ['pdf', 'jpeg', 'jpg', 'png', 'bmp'];

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    console.log("event", event);

    if (files) {
      this.fileToUpload = files.item(0);

      if (!this.fileToUpload) {
        console.error('No file selected');
        return;
      }

      this.fileType = this.fileToUpload.name.split('.').pop()?.toLowerCase() || '';

      if (!allowedTypes.includes(this.fileType)) {
        this.wrongFileType = true;
        console.log("Wrong type of file");
        return;
      }

      console.log("filesize::::", this.fileToUpload.size);

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;

        if (content.includes('/Encrypt')) {
          this.isEncryptedFile = true;
          this.startedFileUpload = false;
          this.isUploadComplete = false;
          console.log('🔒 File is password protected');
        } else {
          this.startedFileUpload = true;
          this.isUploadComplete = false;
          this.isEncryptedFile = false;
          this.convertFileToBase64(this.fileToUpload!);
          console.log('✅ File is not password protected');
        }
      };
      reader.readAsText(this.fileToUpload);
    }
  }

  getProductData(): void {
    this.isLoading = true;
  
    this.commonService.getProductData().pipe(
      timeout(10000),
      catchError(err => {
        this.isLoading = false;
  
        if (err.name === 'TimeoutError') {
          console.error('Request timed out!');
          this.router.navigate(['/oops-try-again']);
        } else {
          console.error('Error fetching products:', err);
        }
  
        return throwError(() => err);
      })
    ).subscribe({
      next: (res) => {
        this.products = res?.products || [];
        this.isLoading = false;
        console.log('product data:', this.products);
      },
      error: (err) => {
      }
    });
  }
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // calculate total pages
  totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  // change page method
  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
  }


  viewMore(product: any) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      let base64String = e.target.result;

      // Remove the prefix (e.g., "data:image/jpeg;base64,")
      base64String = base64String.replace(/^data:[a-zA-Z0-9-\/]+;base64,/, '');

      this.handleBas64String(base64String);
    };

    reader.readAsDataURL(file);
  }
  calculateBase64Size(base64String: string): number {
    const applyPaddingRules = this.hasBase64Padding(base64String);

    // Remove MIME-type from the base64 if exists
    const length = base64String.substring(base64String.indexOf(',') + 1).length;

    let fileSizeInByte = Math.ceil(length / 4) * 3;

    // minimum string length is 3 for padding checks
    const MINIMUM_FILE_SIZE = 2;

    if (applyPaddingRules && fileSizeInByte >= MINIMUM_FILE_SIZE) {
      const paddings = base64String.slice(-2);
      fileSizeInByte = paddings === "==" ? fileSizeInByte - 2 : paddings[1] === '=' ? fileSizeInByte - 1 : fileSizeInByte;
    }

    return fileSizeInByte;
  }

  hasBase64Padding(base64String: string): boolean {
    const lastChar = base64String.slice(-1);
    const secondLastChar = base64String.slice(-2, -1);

    return lastChar === '=' || (secondLastChar === '=' && lastChar === '=');
  }
  updateFormWithFile(base64String: string) {
    this.scaledImage = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${base64String}`);
    console.log("scaled Image", this.scaledImage);
    this.startedFileUpload = false;
    this.isUploadComplete = true;
  }
  handleBas64String(base64String: string) {
    // Check the size of the byte array
    const base64SizeInBytes = this.calculateBase64Size(base64String);
    const base64SizeInMB = base64SizeInBytes / (1024 * 1024);
    console.log("base64SizeInBytes::::", base64SizeInBytes);
    console.log("base64SizeInMB::::", base64SizeInMB);
    console.log("maxFileSize::::", this.maxFileSizeInBytes);
    if (base64SizeInBytes > this.maxFileSizeInBytes) {
      this.startedFileUpload = false;
      console.log("Base64 image size exceeds 2.5 MB.");
    } else {
      // Add base64 string to the form if it doesn't exceed 2.5 MB
      this.updateFormWithFile(base64String);
    }
  }
}
