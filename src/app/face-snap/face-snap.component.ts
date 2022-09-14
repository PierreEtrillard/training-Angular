import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../model/face-snaps.model';
import { FaceSnapService } from '../services/face-snap-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  advertisUser!: string;

  constructor(
    private faceSnapsService: FaceSnapService,
    private router:Router) { }
  ngOnInit() {
    this.advertisUser = 'click on !'
  }
  snapDetail(){
    this.router.navigateByUrl(`/facesnaps/${this.faceSnap.id}`)
  }
  onClickadd() {
    this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'snap');
  }
  onClickRemove() {
    this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'unsnap');
  }
}
