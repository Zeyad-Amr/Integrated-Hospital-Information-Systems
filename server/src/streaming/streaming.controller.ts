import { Controller, Get, Sse, Body, Patch, Param, Delete } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Observable, defer, interval, map, repeat } from 'rxjs';
import { Public } from '../shared/decorators/public.decorator';
interface MessageEvent {
  data: string | object
}
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService,) { }


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
