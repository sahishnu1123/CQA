import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const trial = async (e) => {

    var readData;

    //console.log(e);

    await axios.get('http://localhost:5000/home').then((res) => {

        //onsole.log(res);
        readData = res.data;

    }).catch((err) => {

        //console.log(err);

    });

    return readData;

};

export default trial;