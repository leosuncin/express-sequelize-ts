#!/usr/bin/env node
import { request, type RequestOptions } from 'node:http';
import process from 'node:process';
import { format } from 'node:util';

const options: RequestOptions = {
  hostname: 'localhost',
  port: process.env.PORT ?? '3000',
  path: '/health-check',
  method: 'GET',
};

request(options, (response) => {
  process.stdout.write(`CODE: ${response.statusCode ?? ''}\n`);
  process.stdout.write(`STATUS: ${response.statusMessage ?? ''}\n`);

  process.exit(response.statusCode === 200 ? 0 : 1);
})
  .on('error', (error) => {
    process.stderr.write(`ERROR: ${format(error)}\n`);

    process.exit(1);
  })
  .end();
