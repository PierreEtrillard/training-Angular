import { Injectable } from "@angular/core";
import { FaceSnap } from "../model/face-snaps.model";


@Injectable({
    providedIn: 'root'
})

export class FaceSnapService {
    
    faceSnaps: FaceSnap[] = [
        {
            id:1,
            title: 'clochette',
            description: 'distributrise de poudre qui fait planner',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.NLziet7PbMG9DthIDgw6cQAAAA%26pid%3DApi&f=1',
            createdDate: new Date(),
            snaps: 10,
            location: 'neverland'
        },
        {
            id:2,
            title: 'mickey',
            description: 'Entrepreneur actif',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2F470a4416683311.562afcd080106.jpg&f=1&nofb=1',
            createdDate: new Date(),
            snaps: 200,
        },
        {
            id:3,
            title: 'Rambo',
            description: 'Poête',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-1G4fwq48xcw%2FV-Cz8RD9ULI%2FAAAAAAAAB7Q%2FtI6pzBKelbkGEZJY-GdsGEOzERscivU8ACLcB%2Fs1600%2Frambo-ii-1.jpg&f=1&nofb=1',
            createdDate: new Date(),
            snaps:-20,
        }, {
            id:4,
            title: 'Invisble Man',
            description: '',
            imageUrl: 'https://192.168.8.111',
            createdDate: new Date(),
            snaps: 0,
            location:'juste à coté de vous'
        }
    ]
    getAllFaceSnaps(): FaceSnap[]{
        return this.faceSnaps
    }
    getFaceSnapById(faceSnapId:number){
        const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!faceSnap){
            throw new Error('Auncun faceSnap ne correspond')
        }else{
            return faceSnap;
    }}
    snapFaceSnap(faceSnapId:number,snapType:'snap' |'unsnap'):void{
        const faceSnap = this.getFaceSnapById(faceSnapId);
        snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
    }
}