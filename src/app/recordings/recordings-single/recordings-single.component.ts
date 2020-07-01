import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Vibrant from 'node-vibrant';
import { AudioService } from '../../services/audio.service';
import { StreamState } from '../../interfaces/stream-state';
import { Palette } from 'node-vibrant/lib/color';

@Component({
  selector: 'app-recordings-single',
  templateUrl: './recordings-single.component.html',
  styleUrls: ['./recordings-single.component.scss']
})
export class RecordingsSingleComponent implements OnInit {
  recording: any;
  title: any;
  hex: any;
  isLoading = false;
  getData: any;
  id: any;
  message: string;
  state: StreamState;

  defaultImage = './../../../assets/svg/placeholder.svg';
  private sub: any;

  constructor(
    private audioService: AudioService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  public setTitle({ title }: { title: any }) {
    this.titleService.setTitle('Radio Rasclat • ' + title);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.id = params.id;
      this.apiService
        .getRecording({ recordingId: this.id })
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(recording => {
          this.recording = recording;
          this.setTitle({ title: this.recording.title });
          Vibrant.from(
            'https://cors-anywhere.herokuapp.com/' + this.recording.image
          )
            .getPalette()
            .then(palette => {
              this.hex = palette.Vibrant.hex;
            });
        });
    });
  }

  openFile() {
    this.audioService.stop();
    this.playStream(this.recording.audio);
  }

  play() {
    if (this.state.currentTrack.currentSrc === this.recording.audio) {
      this.audioService.play();
    } else {
      this.openFile();
    }
  }

  pause() {
    this.audioService.pause();
  }

  playStream(url: string) {
    this.audioService
      .playStream(url, this.id, this.recording.title, this.recording.image)
      .subscribe(events => {
        // listening for fun here
      });
  }
}
