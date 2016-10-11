import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { Geolocation } from "ionic-native";

declare var backgroundGeoLocation:any;

@Injectable()
export class GeoService {

    private position: Observable<any>;
    private positionObserver: Observer<any>;
    private watch: Subscription;

    constructor() {
        this.positionObserver = null;

        this.position = Observable.create(observer => {
            this.positionObserver = observer;
        });
    }

    private a = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ];

    private to64(n) {
        let s = "";
        while (n) {
            s = this.a[n % 64] + s
            n /= 64
        }

        return s;
    }

    private hash(lat: number, lng: number, p: number): string {
        lat += 180
        lng += 180

        lat = (lat / p) | 0;
        lng = (lng / p) | 0;

        let cols = (360 / p) | 0;
        let index = (lat * cols) + lng;

        let hash = this.to64(index)

        return hash
    }

    public encode(lat: number, lng: number, p: number): string {
        return this.hash(lat, lng, p);
    }

    public encodeAround(lat: number, lng: number, p: number): string[] {

        let x = lat - p;
        let y = lng - p;
        let es = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                es.push(this.hash(x + p * i, y + p * j, p));
            }
        }

        return es;
    }

    public start() {

        let options = {
            frequency: 3000,
            enableHighAccuracy: true
        };

        this.watch = Geolocation.watchPosition(options).subscribe((data:any) => {
            
            this.notify(data.coords);
        });

        // Background Tracking
        let backgroundOptions = {
            desiredAccuracy: 10,
            stationaryRadius: 10,
            distanceFilter: 30
        };

        backgroundGeoLocation.configure((location) => {
            this.notify(location);
        }, (err) => {
            console.log(err);
        }, backgroundOptions);

        backgroundGeoLocation.start();

        return this.position;

    }

    public stop() {
        backgroundGeoLocation.finish();
        this.watch.unsubscribe();
    }

    public notify(location) {
        this.positionObserver.next(location);
    }
}