import React, { memo, useEffect } from 'react'
import './LineGraph.css'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAnalytic } from '../../redux/features/analytics.slice'

const LineGraph = () => {
  const dispatch = useDispatch()
  let data = useSelector(state=>state.analytics.productAnalytics)
  console.log(data)
  useEffect(()=>{
    dispatch(fetchProductAnalytic())
  },[dispatch])
  return (
    <div className='line-graph-container'>
      
    </div>
  )
}

export default memo(LineGraph)