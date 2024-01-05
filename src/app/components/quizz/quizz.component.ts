import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
 selector: 'app-quizz',
 templateUrl: './quizz.component.html',
 styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

 title:string = ""

 questions:any
 questionSelected:any

 answers:string[] = []
 answerSelected:string =""

 questionIndex:number =0
 questionMaxIndex:number=0

 finished:boolean = false

 constructor() { }

 ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

 }

 playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

 }

 async nextStep(){
    this.questionIndex+=2

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
 }

 async checkResult(anwsers:string[]){
  let results: { [key: string]: number } = {};
  for(let i=0; i<anwsers.length; i++){
      if(results[anwsers[i]]){
          results[anwsers[i]] += 1;
      } else {
          results[anwsers[i]] = 1;
      }
  }

  const sortedKeys = Object.keys(results).sort((a, b) => results[b] - results[a]);
  const highestCount = results[sortedKeys[0]];
  const mostFrequent = sortedKeys.filter(key => results[key] === highestCount);

  if(mostFrequent.length === 1){
      return mostFrequent[0];
  } else {
      return 'Draw between ' + mostFrequent.join(' and ');
  }
}

}
