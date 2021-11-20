import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FeedItem } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent implements OnInit, OnDestroy {
  @Input() feedItems: FeedItem[];
  subscriptions: Subscription[] = [];
  isLoggedIn: boolean = false;

  constructor(private feed: FeedProviderService,  private auth: AuthService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.feed.currentFeed$.subscribe((items) => {
      this.feedItems = items;
      console.log("items", items)
    }));

    this.subscriptions.push(
      this.auth.currentUser$.subscribe((user) => {
        const isLoggedIn = user !== null;
        if (!this.isLoggedIn && isLoggedIn) {
          this.feed.getFeed();
        }
        if (this.isLoggedIn !== isLoggedIn) {
          this.isLoggedIn = isLoggedIn;
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
