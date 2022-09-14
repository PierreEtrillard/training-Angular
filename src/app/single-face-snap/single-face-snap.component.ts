import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceSnap } from '../model/face-snaps.model';
import { FaceSnapService } from '../services/face-snap-service';
@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  advertisUser!: string;

  constructor(private faceSnapsService: FaceSnapService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.advertisUser = 'click on !';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId)
  }
  onClickadd() {
    this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'snap');
  }
  onClickRemove() {
    this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'unsnap');
  }
}
