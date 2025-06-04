import { EnvironmentProviders } from '@angular/core';
import {
    BatchSpanProcessor,
    ConsoleSpanExporter,
    ParentBasedSampler,
    SimpleSpanProcessor,
    TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
//import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
// import { Resource } from '@opentelemetry/resources';
// const { Resource } = require('@opentelemetry/resources');
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

//: EnvironmentProviders
export function provideInstrumentation() {
    const resource = new Resource({
        [ATTR_SERVICE_NAME]: 'Angular App',
        [ATTR_SERVICE_VERSION]: '1.0.0',
    });

    const provider = new WebTracerProvider({
        resource,
        sampler: new ParentBasedSampler({
            root: new TraceIdRatioBasedSampler(0.5)
        }),
        spanProcessors: [
            new SimpleSpanProcessor(new ConsoleSpanExporter()),
            new BatchSpanProcessor(new OTLPTraceExporter({
                url: `http://localhost:4319/v1/traces`
            }))
        ]
    }); // For demo purposes only, immediately log traces to the console

    provider.register({
        propagator: new W3CTraceContextPropagator(),
        contextManager: new ZoneContextManager(),
    }); // Register instrumentations to automatically capture traces from

    registerInstrumentations({
        instrumentations: [
            getWebAutoInstrumentations({
                '@opentelemetry/instrumentation-document-load': {},
                '@opentelemetry/instrumentation-user-interaction': {},
                '@opentelemetry/instrumentation-fetch': {},
                '@opentelemetry/instrumentation-xml-http-request': {},
            }),
        ],
    });

    return provider;
}