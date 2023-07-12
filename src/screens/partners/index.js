import React, { Component } from 'react';
import MainScreen from '../../components/common/MainScreen';
import { styled } from '@material-ui/core/styles';
import backgroundImg from '../../assets/background.png';
import { withStyles, Box, Container } from '@material-ui/core';
import CustomPlanCard from '../../components/common/PackageCard/customPlan-card';
import { partnerList } from './static-data';

const SubWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${backgroundImg})`,
});
const CardDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
class Partners extends Component {
  onClick = (id, name) => {
    if (id && name !== '') {
      this.props.history.push('/dashboard', {
        id: id,
        name: name,
        generatedTokens: localStorage.getItem('generated_tokens'),
      });
    }
  };
  render() {
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <SubWrapper>
          <Container>
            <CardDiv>
              {partnerList.map((data, idx) => (
                <CustomPlanCard
                  status={data.status}
                  select={''}
                  label={data.moduleName}
                  onClick={() => this.onClick(data.moduleId, data.moduleName)}
                  key={idx.toString()}
                  imgFlag={false}
                  localImg={data.localImg}
                />
              ))}
            </CardDiv>
          </Container>
        </SubWrapper>
      </MainScreen>
    );
  }
}
export default Partners;
