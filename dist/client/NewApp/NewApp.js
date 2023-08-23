const runtimeUrl = `${window.location.origin}/runtime/runtime.js`
const Elemento = await import(runtimeUrl)
const {React} = Elemento
const {importModule, importHandlers} = Elemento
const Func1 = await import('./files/Func1.js').then(...importHandlers('*'))

const {types: {ChoiceType, DateType, ListType, NumberType, DecimalType, RecordType, TextType, TrueFalseType, Rule}} = Elemento

// DataTypes_datatypes_1.js
const Greenness = new TrueFalseType('Greenness', {description: 'Whether the beetle is green', required: false})
const WingspanType = new NumberType('WingspanType', {description: 'Wingspan in metres', required: false})
const SpeciesType = new TextType('Species Type', {description: 'Species of beetle', required: true, minLength: 3, maxLength: 15}, [
    new Rule('The Liverpool Rule', $item => $item !== 'Weevil', {description: 'Anything but Weevil'})
])
const CageTypeType = new TextType('Cage Type Type', {description: 'What type of cage it needs', required: true, minLength: 3, maxLength: 15}, [
    new Rule('The Liverpool Rule', $item => $item !== 'Tiny', {description: 'Anything but Tiny'})
])
const CageOptionsType = new ChoiceType('Cage Options Type', {required: false, values: ['Big', 'Small', 'Tiny', 'Minuscule'], valueNames: []})
const CanFlyType1 = new TrueFalseType('Can Fly Type 1', {description: 'Well...can it take off and land?', required: true}, [
    new Rule('Must fly Rule', $item => $item === true, {description: 'Must be able to fly'})
])
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
    WingspanType,
    SpeciesType,
    CageTypeType,
    CageOptionsType,
    CanFlyType1,
    Place
}

// MainPage.js
function MainPage_BeetleDetails(props) {
    const pathWith = name => props.path + '.' + name
    const {Form, TextElement, TextInput, NumberInput, TrueFalseInput, Button} = Elemento.components
    const $form = Elemento.useGetObjectState(props.path)
    const Species = Elemento.useObjectState(pathWith('Species'), new TextInput.State({value: $form.originalValue?.Species}))
    const Wingspan = Elemento.useObjectState(pathWith('Wingspan'), new NumberInput.State({value: 21}))
    const IsGreen = Elemento.useObjectState(pathWith('IsGreen'), new TrueFalseInput.State({value: $form.originalValue?.IsGreen}))
    $form._updateValue()
    const Button2_action = React.useCallback(() => {
        $form.Reset()
    }, [$form])

    return React.createElement(Form, props,
        React.createElement(TextElement, {path: pathWith('Text4')}, 'Tell us about your beetle'),
        React.createElement(TextInput, {path: pathWith('Species'), label: 'Species'}),
        React.createElement(NumberInput, {path: pathWith('Wingspan'), label: 'Wingspan'}),
        React.createElement(TrueFalseInput, {path: pathWith('IsGreen'), label: 'IsGreen'}),
        React.createElement(TextElement, {path: pathWith('FormSummary')}, "Your beetle is a " + $form.value.Species + " modified: " + $form.modified + Species.modified + Wingspan.modified + IsGreen.modified),
        React.createElement(Button, {path: pathWith('Button2'), content: 'Reset', appearance: 'outline', action: Button2_action}),
    )
}


MainPage_BeetleDetails.State = class MainPage_BeetleDetails_State extends Elemento.components.BaseFormState {
    fieldNames = ['Species', 'Wingspan', 'IsGreen']
}


function MainPage(props) {
    const pathWith = name => props.path + '.' + name
    const {Page, TextElement, TextInput, NumberInput, SelectInput, Button, TrueFalseInput, Image} = Elemento.components
    const {Log} = Elemento.globalFunctions
    const {Reset} = Elemento.appFunctions
    const BeetleSpecies = Elemento.useObjectState(pathWith('BeetleSpecies'), new TextInput.State({dataType: DataTypes_datatypes_1.SpeciesType}))
    const Wingspan = Elemento.useObjectState(pathWith('Wingspan'), new NumberInput.State({dataType: DataTypes_datatypes_1.WingspanType}))
    const CageType = Elemento.useObjectState(pathWith('CageType'), new SelectInput.State({dataType: DataTypes_datatypes_1.CageTypeType}))
    const CanFly = Elemento.useObjectState(pathWith('CanFly'), new TrueFalseInput.State({dataType: DataTypes_datatypes_1.CanFlyType1}))
    const BeetleDetails = Elemento.useObjectState(pathWith('BeetleDetails'), new MainPage_BeetleDetails.State({}))
    const Button1_action = React.useCallback(() => {
        Reset(BeetleSpecies)
    }, [BeetleSpecies])
    const BeetleDetails_keyAction = React.useCallback(($event) => {
        const $key = $event.key
        Log('Key pressed', $key)
    }, [])

    return React.createElement(Page, {id: props.path},
        React.createElement(TextElement, {path: pathWith('Text1'), fontSize: 55, color: 'green'}, 'Giant Green Beetles!!!!'),
        React.createElement(TextInput, {path: pathWith('BeetleSpecies'), label: 'Beetle Species', width: '100%'}),
        React.createElement(NumberInput, {path: pathWith('Wingspan'), label: 'Wingspan'}),
        React.createElement(SelectInput, {path: pathWith('CageType'), label: 'Cage Type', values: ['None', 'Small', 'Large', 'Tiny', 'Open']}),
        React.createElement(Button, {path: pathWith('Button1'), content: 'Reset Species', appearance: 'outline', action: Button1_action}),
        React.createElement(TrueFalseInput, {path: pathWith('CanFly'), label: 'Can Fly'}),
        React.createElement(TextElement, {path: pathWith('Text2')}, `All about insects and other ${CanFly.value ? 'flying' : 'wiggly'} creatures`),
        React.createElement(TextElement, {path: pathWith('Text3')}, 'You are ' + Func1.Message(4)),
        React.createElement(MainPage_BeetleDetails, {path: pathWith('BeetleDetails'), label: 'Beetle Details', horizontal: false, wrap: false, keyAction: BeetleDetails_keyAction}),
        React.createElement(TextElement, {path: pathWith('BeetleDetailsSummary')}, BeetleDetails),
        React.createElement(TextElement, {path: pathWith('BeetleDetailsUpdates')}, BeetleDetails.updates),
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
