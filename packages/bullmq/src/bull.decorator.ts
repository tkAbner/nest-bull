import { Inject, SetMetadata } from "@nestjs/common";
import * as deepmerge from "deepmerge";
import { BULL_WORKER_DECORATOR, BULL_WORKER_PROCESSOR_DECORATOR } from "./bull.constants";
import { BullWorkerOptions, BullWorkerProcessOptions } from "./bull.interfaces";
import { getBullQueueToken } from "./bull.utils";
export function BullWorker(options: BullWorkerOptions): Function {
  return (target: any): void => {
    Reflect.defineMetadata(BULL_WORKER_DECORATOR, deepmerge({ name: target.name }, options || {}), target);
  };
}

export function BullWorkerProcess(options: BullWorkerProcessOptions): Function {
  return SetMetadata(BULL_WORKER_PROCESSOR_DECORATOR, options);
}

export function BullQueueInject(queueName: string): Function {
  return Inject(getBullQueueToken(queueName));
}
