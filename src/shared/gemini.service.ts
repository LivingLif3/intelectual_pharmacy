import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private readonly API_KEY = "AIzaSyCXE-uQ3K79zB16EKRwuqzHb6--AnpXOcA"

  private model: any = null

  constructor() {
    const genAI = new GoogleGenerativeAI(this.API_KEY);
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  getAnswer(prompt: string) {
    return of(this.model.generateContent(prompt))
  }
}
