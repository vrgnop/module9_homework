// Задание 1
const parser = new DOMParser()

const xmlObj = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`



let data = parser.parseFromString(xmlObj, 'text/xml')

const result = {
    list: []
}
data.querySelectorAll('student').forEach( (el) => {
    const names = el.querySelector('name')
    const ages = el.querySelector('age')
    const profs =el.querySelector('prof')
    let nameSurname = ''
    let arrayNameSurname = []
    names.querySelectorAll('first, second').forEach((element)=>{
        arrayNameSurname.push(element.textContent)
        nameSurname = arrayNameSurname.join(' ')
    })
    result.list.push({
            name: nameSurname,
            age: ages.textContent,
            prof: profs.textContent,
            lang: names.getAttribute('lang')
        })
})

console.log(result)