import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [MatIconModule, TranslateModule],
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    /** Emits after successful file selection */
    @Output() fileSelected: EventEmitter<{
        uploadEvent: Event;
        file: File;
    }> = new EventEmitter();

    @Output() fileRejected: EventEmitter<string> = new EventEmitter();
    @Output() addClicked = new EventEmitter<void>();

    allowedContentTypes = [
        'application/mpegurl',
        'application/x-mpegurl',
        'application/octet-stream',
        'application/vnd.apple.mpegurl',
        'application/vnd.apple.mpegurl.audio',
        'audio/x-mpegurl',
        'audio/mpegurl',
    ];

    upload(fileList: FileList) {
        if (!this.allowedContentTypes.includes(fileList[0].type)) {
            this.fileRejected.emit(fileList[0].name);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (uploadEvent) =>
            this.fileSelected.emit({
                uploadEvent,
                file: fileList[0],
            });
        fileReader.readAsText(fileList[0]);
        this.addClicked.emit();
    }
}
