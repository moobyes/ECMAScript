// 装饰器
function TestDecorator(target: Function) {
  console.log('test 1')
}

const decorator: ClassDecorator = (target: Function) => {
  target.prototype.message = (msg: string) => {
    console.log(msg)
  }
}

@TestDecorator
@decorator
class Test {

}
const test:any = new Test()
test.message('传递的消息')


// 方法装饰器
const funcDecorator: MethodDecorator = (target: Object, propertyKey:  string | symbol, descriptor: PropertyDescriptor) => {
  descriptor.value = () => {
    console.log('打印系列参数')
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
  }
}

class FunClass {
  @funcDecorator
  public testFunc() {

  }
}

const funClass: any = new FunClass()
funClass.testFunc()