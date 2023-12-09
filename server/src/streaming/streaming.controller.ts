import { Controller, Sse } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Observable, defer, map, repeat } from 'rxjs';
interface MessageEvent {
  data: string | object;
}
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  // @Public()
  @Sse('event')
  async sendEvent(): Promise<Observable<MessageEvent>> {
    return defer(() => this.streamingService.findAllVisits()).pipe(
      repeat({
        delay: 5000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
