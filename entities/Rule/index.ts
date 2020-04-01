import mongoose from 'mongoose';

import { Entity } from "../Entity";

export interface Rule extends Entity {
  title: string;
  href: string;
  content?: string;
  id?: string;
}

export interface ServerRule extends Rule, mongoose.Document {
  id?: mongoose.Document['id'];
}
