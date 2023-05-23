const importUrl = `${window.location.origin}/runtime/runtime.js`
const Elemento = await import(importUrl)
const {React} = Elemento

const {types: {ChoiceType, DateType, ListType, NumberType, RecordType, TextType, TrueFalseType, Rule}} = Elemento

// DataTypes_datatypes_1.js
const Greenness = new TrueFalseType('Greenness', {description: 'Whether the beetle is green', required: false})
const Place = new RecordType('Place', {required: false}, [], [
    new TextType('Name', {required: false}),
    new TextType('Location', {description: 'Where is it?', required: false, maxLength: 10}, [
        new Rule('The Liverpool Rule', $item => $item !== 'Liverpool', {description: 'Anywhere but Liverpool'})
    ]),
    new TrueFalseType('Visited', {basedOn: Greenness, description: 'Have we been there?', required: true}),
    new NumberType('Population', {description: "How many adults live there" + Date.now(), required: false, min: 10}),
    new DateType('Date Type 1', {description: 'This weeks', required: false}),
    new ChoiceType('Colours', {description: 'Colours available', required: false, values: ['red', 'green', 'black'], valueNames: []}),
    new RecordType('Address', {description: 'How to find it', required: false}, [], [
        new TextType('Street', {description: Elemento.codeGenerationError(`Flannel`, 'Unknown names: Flannel'), required: false}),
        new TextType('Town', {required: false, minLength: Elemento.codeGenerationError(`x + 3`, 'Unknown names: x')})
    ])
])

const DataTypes_datatypes_1 = {
    Greenness,
    Place
}

// MainPage.js
function MainPage(props) {
    const pathWith = name => props.path + '.' + name
    const {Page, TextElement, TextInput, Image} = Elemento.components
    const BeetleSpecies = Elemento.useObjectState(pathWith('BeetleSpecies'), new TextInput.State({}))

    return React.createElement(Page, {id: props.path},
        React.createElement(TextElement, {path: pathWith('Text1'), fontSize: 55, color: 'red'}, 'Giant Red Beetles!!!'),
        React.createElement(TextInput, {path: pathWith('BeetleSpecies'), label: 'Beetle Species'}),
        React.createElement(TextElement, {path: pathWith('Text2')}, 'All about insects and other wiggly creatures'),
        React.createElement(Image, {path: pathWith('BeetleImage'), source: 'Tansy_Beetle.jpg', width: '50%'}),
        React.createElement(Image, {path: pathWith('GazelleImage'), source: 'GazellePicStd.webp'}),
    )
}

// appMain.js
export default function NewApp(props) {
    const pathWith = name => 'NewApp' + '.' + name
    const {App} = Elemento.components
    const pages = {MainPage}
    const {appContext} = props
    const app = Elemento.useObjectState('app', new App.State({pages, appContext}))

    return React.createElement(App, {path: 'NewApp', },)
}
