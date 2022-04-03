import React, {Component} from 'react';

type FormProps = {
    setCity: (event: React.ChangeEvent<HTMLInputElement>) => void,
    city: string,
    result: number
}


class Form extends Component<FormProps, {}> {


    render() {
        const {setCity, city, result} = this.props;
        return (
            <form className="flex flex-col gap-y-2 items-center">
                <input autoFocus
                       value={city} className="px-4 py-2 rounded-lg w-[300px]" type="text" placeholder="City"
                       onChange={setCity}/>
                {
                    (result == 404) ?
                        <p className="text-red-500 font-bold">City not found</p> :
                        null
                }
            </form>
        )
    }

}

export default Form;