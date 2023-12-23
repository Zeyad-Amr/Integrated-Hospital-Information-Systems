import { Controller, Sse } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Observable, defer, map, repeat } from 'rxjs';
interface MessageEvent {
  data: string | object;
}
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) { }

  @Sse('event') // server sent emitter
  async sendEvent(): Promise<Observable<MessageEvent>> {
    return defer(() => this.streamingService.getERareaVisits()).pipe(
      repeat({
        delay: 10000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
