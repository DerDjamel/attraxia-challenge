import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import SupportIcon from '@mui/icons-material/Support';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchInput from '../inputs/SearchInput';
import { memo } from 'react';

function SupportSection() {
  return (
    <Box sx={{ backgroundColor: '#ffffff' }}>
      <Box paddingY={2} paddingX={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{ fontWeight: 'bold' }}>
            Support resources
          </Typography>
          <Box>
            <Stack direction={'row'} spacing={2} alignItems="center">
              <Typography
                variant="body2"
                sx={{
                  color: '#555555',
                  textTransform: 'capitalize',
                  fontWeight: 400
                }}>
                Need Help ?
              </Typography>
              <Button
                disableElevation
                variant="contained"
                sx={{
                  paddingBlock: 1,
                  paddingInline: 4,
                  textTransform: 'capitalize'
                }}
                startIcon={<SupportIcon />}>
                Get Support
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box paddingY={14} paddingX={4}>
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={1}>
          <Box
            sx={{
              backgroundColor: '#333333',
              borderRadius: '100%',
              padding: 2,
              marginBottom: 2
            }}>
            <QuestionAnswerRoundedIcon
              sx={{
                fontSize: 50,
                color: '#FFF'
              }}
            />
          </Box>
          <Typography
            sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            variant={'h5'}>
            Support Forum
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555555',
              textTransform: 'capitalize',
              fontWeight: 400
            }}>
            Search the topic you need help with in our support forums.
          </Typography>
          <Button
            disableElevation
            sx={{ paddingBlock: 1, paddingInline: 4 }}
            endIcon={<ArrowForwardIcon />}>
            Browse Forums
          </Button>
          <SearchInput sx={{ width: '26rem' }}></SearchInput>
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(SupportSection);
